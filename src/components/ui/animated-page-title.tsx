"use client";

import { useEffect, useState } from "react";

export default function AnimatedPageTitle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Animate the document title with typing effect
    const baseTitle = "Serava Care";
    const suffixes = [
      " - Đặt lịch khám bệnh dễ dàng",
      " - 🏥 Tìm bác sĩ chính xác",
      " - ⚡ Đặt lịch nhanh chóng",
      " - 🔍 Hơn 1000 bác sĩ",
      " - 🏨 125 bệnh viện",
      " - 💙 Chăm sóc sức khỏe",
    ];

    let currentSuffixIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const typeTitle = () => {
      const currentSuffix = suffixes[currentSuffixIndex];

      if (!isDeleting && currentCharIndex < currentSuffix.length) {
        // Typing
        document.title =
          baseTitle + currentSuffix.slice(0, currentCharIndex + 1);
        currentCharIndex++;
        setTimeout(typeTitle, 100);
      } else if (isDeleting && currentCharIndex > 0) {
        // Deleting
        document.title =
          baseTitle + currentSuffix.slice(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(typeTitle, 50);
      } else if (!isDeleting && currentCharIndex === currentSuffix.length) {
        // Pause before deleting
        setTimeout(() => {
          isDeleting = true;
          typeTitle();
        }, 2000);
      } else if (isDeleting && currentCharIndex === 0) {
        // Move to next suffix
        isDeleting = false;
        currentSuffixIndex = (currentSuffixIndex + 1) % suffixes.length;
        setTimeout(typeTitle, 500);
      }
    };

    // Start the animation after a short delay
    const startTimeout = setTimeout(typeTitle, 1000);

    return () => {
      clearTimeout(startTimeout);
      document.title = "Serava Care - Đặt lịch khám bệnh dễ dàng & nhanh chóng";
    };
  }, []);

  if (!mounted) return null;

  return null; // This component doesn't render anything visible
}
