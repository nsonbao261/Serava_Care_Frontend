"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "./button";
import {
  Menu,
  X,
  User,
  Bell,
  Phone,
  MapPin,
  ChevronDown,
  Calendar,
  Building2,
  Stethoscope,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingDropdownOpen, setIsBookingDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleBookingDropdown = () =>
    setIsBookingDropdownOpen(!isBookingDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsBookingDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const bookingServices = [
    {
      label: "Đặt khám Bác sĩ",
      href: "/bac-si",
      icon: Stethoscope,
      description: "Đặt lịch khám với bác sĩ chuyên khoa",
    },
    {
      label: "Đặt khám Bệnh viện",
      href: "/dat-kham/benh-vien",
      icon: Building2,
      description: "Đặt lịch khám tại các bệnh viện uy tín",
    },
    {
      label: "Đặt khám Phòng khám",
      href: "/dat-kham/phong-kham",
      icon: Calendar,
      description: "Đặt lịch tại phòng khám tư nhân",
    },
  ];

  const navigationItems = [
    { label: "Danh sách bác sĩ", href: "/bac-si" },
    { label: "Chuyên khoa", href: "/bac-si/chuyen-khoa" },
    { label: "Tin Y tế", href: "/tin-tuc" },
    { label: "Về chúng tôi", href: "/about" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>Hotline: 1900-2805</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>8:00 - 17:30 (T2 - T7)</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/download"
                className="text-blue-600 hover:text-blue-800"
              >
                Tải ứng dụng
              </Link>
              <Link href="/help" className="text-gray-600 hover:text-gray-800">
                Trợ giúp
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-blue-600 text-white font-bold text-xl px-3 py-1 rounded-lg animate-pulse group-hover:bg-blue-700 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                SC
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 animate-slide-in group-hover:text-blue-600 transition-colors duration-300">
                  Serava
                </span>
                <span className="text-sm text-blue-600 font-medium animate-fade-in-up group-hover:text-blue-700 transition-colors duration-300">
                  Care
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Đặt khám Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleBookingDropdown}
                onMouseEnter={() => setIsBookingDropdownOpen(true)}
                onMouseLeave={() => setIsBookingDropdownOpen(false)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                <span>Đặt khám</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Dropdown Menu */}
              {isBookingDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-4 z-50"
                  onMouseEnter={() => setIsBookingDropdownOpen(true)}
                  onMouseLeave={() => setIsBookingDropdownOpen(false)}
                >
                  {bookingServices.map((service) => {
                    const IconComponent = service.icon;
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex items-start space-x-3 px-6 py-3 hover:bg-blue-50 transition-colors duration-200"
                        onClick={() => setIsBookingDropdownOpen(false)}
                      >
                        <div className="bg-blue-100 text-blue-600 rounded-lg p-2 mt-1">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {service.label}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {service.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="border-t border-gray-100 mt-2 pt-3 px-6">
                    <Link
                      href="/dat-kham"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      onClick={() => setIsBookingDropdownOpen(false)}
                    >
                      Xem tất cả dịch vụ đặt khám →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other Navigation Items */}
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="hidden md:flex p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all duration-200 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Login/Profile */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <User className="h-4 w-4" />
                <span>Đăng nhập</span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            {/* Mobile Navigation Items */}
            <nav className="space-y-4">
              {/* Mobile Booking Services */}
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Dịch vụ đặt khám
                </h3>
                <div className="space-y-3">
                  {bookingServices.map((service) => {
                    const IconComponent = service.icon;
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex items-center space-x-3 text-gray-700 hover:text-blue-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{service.label}</div>
                          <div className="text-sm text-gray-500">
                            {service.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Other Mobile Navigation Items */}
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
              <Button variant="outline" className="w-full justify-center">
                <User className="h-4 w-4 mr-2" />
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
