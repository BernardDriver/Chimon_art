"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function PatternGenerator() {
  const [prompt, setPrompt] = useState("现代非遗风格的云纹花纹");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setImageUrl(data.image);
    } catch (err) {
      console.error("生成失败", err);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">现代非遗风格花纹生成器</h1>
      <Card>
        <CardContent className="p-4 space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="输入您想要的花纹描述，如“景泰蓝龙纹，蓝金配色，现代构图”"
          />
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? "生成中..." : "生成花纹"}
          </Button>
          {imageUrl && (
            <div className="pt-4">
              <img src={imageUrl} alt="生成的花纹" className="rounded-xl border shadow" />
              <a href={imageUrl} download="pattern.png" className="mt-2 inline-block text-blue-600 underline">
                下载图片
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
