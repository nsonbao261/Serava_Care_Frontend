'use client'

import { useState } from "react";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, X } from "lucide-react";
import { useRouter } from "next/navigation";
import BackgroundMotion from "@/components/motion/BackgroundMotion";

export default function SignUp() {

  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const handleClose = () => {
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to primary-100 flex items-center justify-center p-4" >
      <BackgroundMotion />
      <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className="w-full max-w-xl relative">{/* Thêm relative để position icon X*/}
        {/* Nút đóng (dấu X) */}
        <button onClick={handleClose} className="absolute top-4 right-4 text-blue-500 hover:text-blue-700 transition-colors">
          <X size={20}/>
        </button>
        
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-left space-y-2">
            <h1 className="text-2xl font-bold tracking-tighter text-blue-800">Đăng ký</h1>
            <p className="text-sm text-blue-700">Serava Care - Sức khỏe của bạn là ưu tiên hàng đầu của chúng tôi</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-700">Số điện thoại hoặc email</Label>
              <Input id = "email" type="email" placeholder="Nhập số điện thoại hoặc email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md border-blue-500 focus:border-blue-700" required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-blue-700">Tên đầy đủ</Label>
              <Input id = "fullName" type="fullName" placeholder="Nhập họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} className="rounded-md border-blue-500 focus:border-blue-700" required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-blue-700">Ngày sinh</Label>
              <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="rounded-md border-blue-500 focus:border-blue-700" required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-blue-700">Giới tính</Label>
              <select id="gender" name="gender" className="w-full border border-blue-500 rounded-md px-3 py-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" defaultValue="" required>
                <option value="" disabled>--Chọn giới tính--</option>
                <option value="male" >Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-blue-700">Xác nhận lại mật khẩu</Label>
              <div className="relative">
                <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Xác nhận lại mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="rounded-md border-blue-500 focus:border-blue-700" required/>
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                  {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
              </div>
            </div>

          <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">ĐĂNG KÝ</Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

