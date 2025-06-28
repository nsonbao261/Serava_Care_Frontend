'use client'
import { useState } from "react";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, X } from "lucide-react";
import Link from "next/link";
import BackgroundMotion from "@/components/motion/BackgroundMotion";


export default function Login() {

  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to primary-100 flex items-center justify-center p-4">
      <BackgroundMotion />
      <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="w-full max-w-xl relative">
        {/* Nút đóng (dấu X) */}
        <button className="absolute top-4 right-4 text-blue-500 hover:text-blue-700 transition-colors">
          <X size={20}/>
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-left space-y-2">
            <h1 className="text-2xl font-bold tracking-tighter text-blue-800">Đăng nhập</h1>
            <p className="text-sm text-blue-700">Serava Care - Sức khỏe của bạn là ưu tiên hàng đầu của chúng tôi</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-700">Số điện thoại hoặc email</Label>
              <Input id = "email" type="email" placeholder="Nhập số điện thoại hoặc email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md border-blue-500 focus:border-blue-700" required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-700">Mật khẩu</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md border-blue-500 focus:border-blue-700" required/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
              </div>
            </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-2 border-blue-300 w-5 h-5"/>
              <Label htmlFor="remember">Nhớ mật khẩu</Label>
            </div>

            <a href="#" className="text-sm text-primary-500 hover:text-primary-600">Quên mật khẩu?</a>
          </div>

          <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">ĐĂNG NHẬP</Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"/>
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-blue-700 text-muted-forceground">Hoặc đăng nhập bằng</span>
            </div>
          </div>

          <div className="w-full">
            <Button variant="outline" className="w-full border-blue-700 text-blue-700 hover:bg-blue-100">
              <Mail className="mr-2 h-4 w-4"/>
              Google
            </Button>
          </div>

          <div className="text-center text-sm">
            Bạn chưa có tài khoản?{" "}
            <Link href='/auth/signup' className="text-primary-500 hover:text-primary-600 font-medium">Đăng ký ngay.</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
