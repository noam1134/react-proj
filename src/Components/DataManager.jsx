import { useCallback, useEffect, useState } from "react";
import { apiLink } from "./consts";


const DataManager = ({
  user,
  setEmails: setExternalEmails,
}) => {
  const [hospitalManagers, setHospitalManagers] = useState([]);
  const [emails, setLocalEmails] = useState([]);

  const fetchManagers = useCallback(() => {
    if (user && user.hospitalId) {
      const url =
        apiLink +
        `HospitalManager/GetAllHospitalManagersByHospitalId?hospitalId=${user.hospitalId}`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hospitalId: user.hospitalId }),
      })
        .then((response) => response.json())
        .then((data) => {
          const filteredManagers = data.filter(
            (manager) => manager.email !== user.email
          );
          setHospitalManagers(filteredManagers);
        })
        .catch((error) =>
          console.error("Failed to fetch hospital managers", error)
        );
    }
  }, [user]);

  const fetchEmails = useCallback(() => {
    if (user && user.email) {
      const url = apiLink + `Mail/GetAllEmailsByManager?email=${user.email}`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          setLocalEmails(data);
          setExternalEmails(data); 
        })
        .catch((error) => console.error("Error fetching emails:", error));
    }
  }, [user, setExternalEmails]);

  useEffect(() => {
    fetchManagers();
    fetchEmails();
  }, [fetchManagers, fetchEmails]);

  return { hospitalManagers, emails };
};

export default DataManager;
