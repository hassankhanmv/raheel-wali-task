import React, { useState } from "react";
import "./App.css";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [userFormValues, setUserFormValues] = useState(null);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const phoneBrands = [
    { band_id: "2001", band: "IPHONE", value: "IPHONE" },
    { band_id: "2002", band: "SUMSUNG", value: "SUMSUNG" },
    { band_id: "2003", band: "GOOGLE PHONE", value: "GOOGLE_PHONE" },
  ];

  const skills = [
    { skill_id: "3001", skill: "HTML", value: "HTML" },
    { skill_id: "3002", skill: "CSS", value: "CSS" },
    { skill_id: "3003", skill: "JavaScript", value: "JavaScript" },
  ];

  const handleSubmit = (values) => {
    if (editingUserId) {
      const userIndex = users.findIndex(
        (user) => user.user_id === editingUserId
      );
      if (userIndex !== -1) {
        const updatedUsers = [...users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...values };
        setUsers(updatedUsers);
      }
      setEditingUserId(null);
      setUserFormValues(null);
    } else {
      setUsers([...users, { ...values, user_id: uuidv4() }]);
    }
  };

  const handleEdit = (userId) => {
    const userToEdit = users?.find((user) => user?.user_id === userId);
    if (userToEdit) {
      setEditingUserId(userId);
      setUserFormValues(userToEdit);
    }
  };

  const handleRemove = (userId) => {
    setUsers(users.filter((user) => user?.user_id !== userId));
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setUserFormValues(null);
  };

  return (
    <div className="container mx-auto p-4">
      <UserForm
        onSubmit={handleSubmit}
        phoneBrands={phoneBrands}
        skills={skills}
        initialValues={userFormValues}
        isEditing={!!editingUserId}
        onCancelEdit={handleCancelEdit}
      />
      <UserTable
        userData={users}
        phoneBrands={phoneBrands}
        skills={skills}
        onEdit={handleEdit}
        onRemove={handleRemove}
      />
    </div>
  );
}

export default App;
