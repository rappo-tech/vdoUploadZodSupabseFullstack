"use client";

import { useState } from "react";
import { userSchema,UserInput } from "../../../lib/zodSchemas/userSchema";
import axios from "axios";
import { UseUser } from "../../../zustandStore/useUser";


export default function CreateUserForm() {
  const [formData, setFormData] = useState<UserInput>({
    userName: "",
    age: 0,
    role: "USER",
  });
  const [status, setStatus] = useState("");
  const {setUser}=UseUser()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse(formData);
    if (!result.success) {
      setStatus(result.error.issues[0].message);
      return;
    }

    try {
      const res = await axios.post("/api2/createUser", formData);
      if (res.status === 201) {
        setStatus("✅ User created!");
       setUser({
    userName:formData.userName, 
    age:formData.age, 
    role:formData.role
       })
        setFormData({ userName: "", age: 0, role: "USER" });
      } else {
        setStatus("❌ Failed to create user");
      }
    } catch  {
      setStatus("❌ Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded w-fit">
      <div>
        <label>Username: </label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="border px-2 py-1"
        />
      </div>
      <div>
        <label>Age: </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="border px-2 py-1"
        />
      </div>
      <div>
        <label>Role: </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border px-2 py-1"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="MODERATOR">Moderator</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create User
      </button>
      <p className="text-sm text-green-600">{status}</p>
    </form>
  );
}
