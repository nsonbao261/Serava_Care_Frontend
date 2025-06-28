import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserX, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <UserX className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Không tìm thấy bác sĩ
          </h1>
          <p className="text-gray-600">
            Bác sĩ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/danh-sach-bac-si">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách bác sĩ
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="w-full">
              Về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
