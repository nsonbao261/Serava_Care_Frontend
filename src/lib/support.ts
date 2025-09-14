import slugify from "slugify";

export function createSlug(str: string) {
    return slugify(str, {
        lower: true,      // chuyển thành chữ thường
        strict: true,     // loại bỏ ký tự đặc biệt
        locale: 'vi',     // hỗ trợ tiếng Việt
        trim: true        // bỏ khoảng trắng đầu/cuối
    })
}