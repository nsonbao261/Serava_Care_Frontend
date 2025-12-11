'use client'

import React from 'react'
import Image from 'next/image'

const partners = [
  { name: 'Bệnh viện Chợ Rẫy', logo: '/partners/cho-ray.png' },
  { name: 'Bệnh viện Nhi Đồng 1', logo: '/partners/nhi-dong-1.png' },
  { name: 'Bệnh viện 115', logo: '/partners/115.png' },
  { name: 'Bệnh viện Đại học Y Dược', logo: '/partners/yd.png' },
  { name: 'Bệnh viện Từ Dũ', logo: '/partners/tu-du.png' },
  { name: 'Bệnh viện Mắt TPHCM', logo: '/partners/mat.png' },
]

export default function Partners() {
  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Đối tác y tế uy tín
          </h2>
          <p className="text-gray-600">
            Kết nối với các bệnh viện và phòng khám hàng đầu Việt Nam
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              {/* Placeholder - thay bằng logo thật */}
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-400 text-center px-2">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}