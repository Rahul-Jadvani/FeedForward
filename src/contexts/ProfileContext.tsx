
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  preferences: {
    theme?: string;
    notifications?: boolean;
    marketplaceAlerts?: boolean;
    emailUpdates?: boolean;
  };
  updated_at: string | null;
  created_at: string | null;
};

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
  uploading: boolean;
  uploadAvatar: (file: File) => Promise<string | null>;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  loading: true,
  error: null,
  updateProfile: async () => {},
  refreshProfile: async () => {},
  uploading: false,
  uploadAvatar: async () => null
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user) {
        setProfile(null);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      if (data) {
        // Ensure preferences is an object
        const preferences = data.preferences || {};
        setProfile({
          ...data,
          preferences
        });
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      // Update local state on success
      setProfile((prevProfile) => prevProfile ? { ...prevProfile, ...updates } : null);
      toast.success("Profile updated successfully");
    } catch (err: any) {
      console.error('Error updating profile:', err);
      toast.error("Failed to update profile");
      throw err;
    }
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [isAuthenticated, user?.id]);

  const uploadAvatar = async (file: File): Promise<string | null> => {
    try {
      if (!user) throw new Error("User not authenticated");
      
      setUploading(true);
      
      // Create storage bucket if it doesn't exist yet (normally would be done via migrations)
      const { error: createBucketError } = await supabase.storage.createBucket('avatars', {
        public: true,
        fileSizeLimit: 1024 * 1024 * 2, // 2MB
      });
      
      if (createBucketError && !createBucketError.message.includes('already exists')) {
        throw createBucketError;
      }

      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const avatarUrl = urlData?.publicUrl || null;

      if (avatarUrl) {
        // Update the profile with the new avatar URL
        await updateProfile({ avatar_url: avatarUrl });
      }

      return avatarUrl;
    } catch (err: any) {
      console.error('Error uploading avatar:', err);
      toast.error("Failed to upload avatar");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      loading,
      error,
      updateProfile,
      refreshProfile,
      uploading,
      uploadAvatar
    }}>
      {children}
    </ProfileContext.Provider>
  );
};
