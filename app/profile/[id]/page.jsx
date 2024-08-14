"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const { id } = useParams();
  console.log(username);
  console.log(id);

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${id}/posts`);
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`update-dream?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this dream ?"
    );
    if (hasConfirmed) {
      if (!post._id) return alert("Dream ID not found");
      try {
        const response = await fetch(`/api/dream/${post._id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const response = await fetch(`/api/dream/${post._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Profile
      name={`${username}`}
      desc={`Welcome to ${username} presonalized profile page`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
