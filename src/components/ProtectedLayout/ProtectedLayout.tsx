import { checkLogin } from '../../services/user';
import { useEffect } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

export const ProtectedLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  useEffect(() => {
    const autoCheckLogin = async () => (
      checkLogin().catch((_err) => navigate('/login'))
    )

    autoCheckLogin()
  }, [navigate])

  return (outlet);
};