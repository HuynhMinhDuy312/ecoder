# Yêu cầu cài đặt

-   NodeJS
-   MongoDb

# Hướng dẫn khởi động website

## Cài đặt modules

### Server

1. Sử dụng Terminal hoặc Command Prompt mở thư mục gốc **ecoder**

    `cd ecoder`

2. Cài đặt node modules

    `npm install`

### Client

1. Sử dụng Terminal hoặc Command Prompt mở thư mục client **ecoder/client**

    `cd client`

2. Cài đặt node modules

    `npm install`

## Khởi động website

### Yêu cầu chung

**Build client**

Tại thư mục client **ecoder/client**, chạy câu lệnh `npm run build`

### Dùng 1 máy chủ

#### Môi trường Development

1. Tại thư mục gốc **ecoder**, khởi động server bằng cách chạy câu lệnh

    `npm run start:dev`

2. Truy cập server ở đường dẫn

    http://localhost:8000

#### Môi trường Production

1. Tại thư mục gốc **ecoder**, build server bằng cách chạy câu lệnh:

    `npm run build`

2. Khởi động server bằng cách chạy câu lệnh:

    `npm run start`

3. Truy cập server ở đường dẫn

    http://localhost:8000

### Dùng 2 máy chủ (Front-End và Back-End riêng biệt)

#### Môi trường Development

##### Back-end

Tại thư mục gốc **ecoder**, khởi động server bằng cách chạy câu lệnh `npm run start:dev`

##### Front-end

1. Tại thư mục client **ecoder/client**, khởi động client bằng cách chạy câu lệnh

    `npm run start`

2. Truy cập server ở đường dẫn

    http://localhost:3000

#### Môi trường Production

##### Back-end

Tại thư mục gốc **ecoder**, khởi động server bằng cách chạy câu lệnh `npm run start`

##### Front-end

1. Tại thư mục client **ecoder/client**, khởi động client bằng cách chạy câu lệnh

    `npx serve -s build`

2. Truy cập server ở đường dẫn

    http://localhost:3000
