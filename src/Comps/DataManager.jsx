import { useCallback, useEffect, useState } from "react";

const DataManager = ({ user, setSelectedManager, setPopupOpen, setEmails: setExternalEmails, setEmailModalOpen }) => {
  const [hospitalManagers, setHospitalManagers] = useState([]);
  const [emails, setLocalEmails] = useState([]);

  const fetchManagers = useCallback(() => {
    if (user && user.hospitalId) {
      const url = `https://localhost:7115/api/HospitalManager/GetAllHospitalManagersByHospitalId?hospitalId=${user.hospitalId}`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hospitalId: user.hospitalId })
      })
        .then(response => response.json())
        .then(data => {
          const filteredManagers = data.filter(manager => manager.email !== user.email);
          setHospitalManagers(filteredManagers);
        })
        .catch(error => console.error("Failed to fetch hospital managers", error));
    }
  }, [user]);

  const fetchEmails = useCallback(() => {
    if (user && user.email) {
      const url = `https://localhost:7115/api/Mail/GetAllEmailsByManager?email=${user.email}`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setLocalEmails(data);
          setExternalEmails(data);  // Pass emails up to the parent component
        })
        .catch(error => console.error("Error fetching emails:", error));
    }
  }, [user, setExternalEmails]);

  useEffect(() => {
    fetchManagers();
    fetchEmails();
  }, [fetchManagers, fetchEmails]);

  return { hospitalManagers, emails };
};

export default DataManager;
