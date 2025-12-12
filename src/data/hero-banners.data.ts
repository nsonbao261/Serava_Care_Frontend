import type { HeroBanner } from '@/types/hero'

export const HERO_BANNERS: HeroBanner[] = [
  {
    id: 1,
    image: 'https://gakfhgpzzlfujxhypcpe.supabase.co/storage/v1/object/public/SeravaCare_Events/05-07-07-07-sieu-sale-ngay-doi-7-7-giam-den-40-thumb-845x442.jpg',
    title: 'Ưu đãi đặc quyền',
    subtitle: 'Giảm giá khám tổng quát',
    link: '/khuyen-mai/uu-dai-dac-quyen',
    priority: true
  },
  {
    id: 2,
    image: 'https://gakfhgpzzlfujxhypcpe.supabase.co/storage/v1/object/public/SeravaCare_Events/132uu-dai-ngay-thay-thuoc-giam-50-phieu-kham.jpg',
    title: 'Tết niềng răng',
    subtitle: 'Ưu đãi nha khoa',
    link: '/khuyen-mai/tet-nieng-rang'
  },
  {
    id: 3,
    image: 'https://gakfhgpzzlfujxhypcpe.supabase.co/storage/v1/object/public/SeravaCare_Events/b2289dd1-3c35-4ffb-996f-a8073d2e6108.png',
    title: 'Chăm sóc y tế',
    subtitle: 'Dành cho nhân viên ngành y',
    link: '/khuyen-mai/nhan-vien-y-te'
  },
  {
    id: 4,
    image: 'https://gakfhgpzzlfujxhypcpe.supabase.co/storage/v1/object/public/SeravaCare_Events/banner-lhts-26042025-mb.jpg',
    title: 'Ưu đãi đặc quyền',
    subtitle: 'Dành cho khách hàng VIP',
    link: '/khuyen-mai/vip'
  },
  {
    id: 5,
    image: 'https://gakfhgpzzlfujxhypcpe.supabase.co/storage/v1/object/public/SeravaCare_Events/dieu-tri-viem-truc-trang.jpg',
    title: 'Ưu đãi niềng răng',
    subtitle: 'Dành cho khách hàng mới',
    link: '/khuyen-mai/khach-hang-moi'
  },
  {
    id: 6,
    image: 'https://gakfhgpzzlfujxhypcpe.supabase.co/storage/v1/object/public/SeravaCare_Events/tu-01-08-31-08-my-pham-giam-gia-soc-bat-ngo-tai-bach-hoa-xanh-202208111527497425.jpg',
    title: 'Ưu đãi niềng răng',
    subtitle: 'Dành cho khách hàng mới',
    link: '/khuyen-mai/khach-hang-moi'
  },
  {
    id: 7,
    image: 'https://gakfhgpzzlfujxhypcpe.supabase.co/storage/v1/object/public/SeravaCare_Events/z2068839146352_594ac3ca039f178303ed0e406af4193f.jpg',
    title: 'Ưu đãi niềng răng',
    subtitle: 'Dành cho khách hàng mới',
    link: '/khuyen-mai/khach-hang-moi'
  }
]

// Helper functions (optional)
export const getActiveBanners = () => HERO_BANNERS.filter(banner => banner.id) // Có thể thêm logic filter

export const getBannerById = (id: number) => HERO_BANNERS.find(banner => banner.id === id)