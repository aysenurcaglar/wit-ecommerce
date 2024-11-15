import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, ChartArea } from "lucide-react";

const FeaturedPosts = () => {
  const posts = [
    {
      title: "Loudest à la Madison #1 (L'integral)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: "22 April 2021",
      comments: 10,
      category: ["Google", "Trending", "New"],
      image: "unsplash_hHdHCfAifHU.jpg",
    },
    {
      title: "Loudest à la Madison #2 (L'integral)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: "22 April 2021",
      comments: 10,
      category: ["Google", "Trending", "New"],
      image: "unsplash_tVEqStC2uz8.jpg",
    },
    {
      title: "Loudest à la Madison #3 (L'integral)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: "22 April 2021",
      comments: 10,
      category: ["Google", "Trending", "New"],
      image: "unsplash_dEGu-oCuB1Y.jpg",
    },
  ];

  return (
    <div className="max-w-[80vw] md:max-w-75vw mx-auto my-12">
      <h2 className="text-sm text-primary-color font-semibold">
        Practice Advice
      </h2>
      <h2 className="text-2xl font-bold text-center mt-2">Featured Posts</h2>
      <p className="text-light-gray m-4">
        Problems trying to resolve the conflict between the two major realms of
        Classical physics: Newtonian mechanics
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <Card key={index} className="rounded-lg overflow-hidden shadow-md">
            <CardHeader className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-8 left-8 bg-danger-color text-white px-2 py-1">
                NEW
              </Badge>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex space-x-2 text-sm text-gray-500 mb-2">
                {post.category.map((cat, i) => (
                  <span key={i}>{cat}</span>
                ))}
              </div>
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.description}</p>
            </CardContent>
            <CardFooter className="p-4 border-t text-sm flex justify-between text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ChartArea />
                <span>{post.comments} comments</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
