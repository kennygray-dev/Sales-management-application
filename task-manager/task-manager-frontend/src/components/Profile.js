import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Fetch error: " + error.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {error ? <p>Error: {error}</p> : <p>User: {JSON.stringify(user)}</p>}
    </div>
  );
};

export default Profile;
