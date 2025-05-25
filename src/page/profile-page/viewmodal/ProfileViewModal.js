import { useEffect, useState } from "react";
import { getUserDetail } from "../../../services/api";

export function useProfileViewModal(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getUserDetail(userId)
      .then((res) => {
        setProfile(res?.data?.result || null);
        setError(null);
      })
      .catch((err) => setError(err?.message || "Error"))
      .finally(() => setLoading(false));
  }, [userId]);

  return { profile, loading, error };
}
