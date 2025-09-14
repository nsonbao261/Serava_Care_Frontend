'use client'

import React, {PropsWithChildren} from "react";
import {Home, LogOut, Settings, Stethoscope, UserCheck, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default (({children}) => {
    const pathname = usePathname();

    const isActiveRoute = (path: string) => pathname === path;

    return (
        <div className="h-screen flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-sm border-r flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800">Serava Care</h2>
                </div>

                <nav className="mt-6 flex-1 overflow-y-auto">
                    <div className="px-3 space-y-1">
                        <Link href="/admin/dashboard">
                            <Button
                                variant={isActiveRoute("/admin/dashboard") ? "secondary" : "ghost"}
                                className="w-full justify-start text-left"
                            >
                                <Home className="mr-3 h-4 w-4"/>
                                Dashboard
                            </Button>
                        </Link>
                        <Link href="/admin/bac-si">
                            <Button
                                variant={isActiveRoute("/admin/bac-si") ? "secondary" : "ghost"}
                                className="w-full justify-start text-left"
                            >
                                <Users className="mr-3 h-4 w-4"/>
                                Bác sĩ
                            </Button>
                        </Link>
                        <Link href="/admin/benh-nhan">
                            <Button
                                variant={isActiveRoute("/admin/benh-nhan") ? "secondary" : "ghost"}
                                className="w-full justify-start text-left"
                            >
                                <UserCheck className="mr-3 h-4 w-4"/>
                                Bệnh nhân
                            </Button>
                        </Link>
                        <Link href="/admin/chuyen-khoa">
                            <Button
                                variant={isActiveRoute("/admin/chuyen-khoa") ? "secondary" : "ghost"}
                                className="w-full justify-start text-left"
                            >
                                <Stethoscope className="mr-3 h-4 w-4"/>
                                Chuyên khoa
                            </Button>
                        </Link>
                        <Link href="/admin/settings">
                            <Button
                                variant={isActiveRoute("/admin/settings") ? "secondary" : "ghost"}
                                className="w-full justify-start text-left"
                            >
                                <Settings className="mr-3 h-4 w-4"/>
                                Cài đặt
                            </Button>
                        </Link>
                    </div>
                </nav>

                <div className="p-6 border-t">
                    <Button variant="ghost" className="w-full justify-start text-left text-red-600">
                        <LogOut className="mr-3 h-4 w-4"/>
                        Đăng xuất
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 h-screen overflow-y-auto bg-gray-50">
                {children}
            </div>
        </div>
    )
}) satisfies React.FC<PropsWithChildren>
