import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import type { ServiceType } from "@bufbuild/protobuf";

// APIのベースURLを環境変数から取得。デフォルトはローカル開発用
const GRPC_BASE_URL = process.env.NEXT_PUBLIC_GRPC_BASE_URL || 'http://localhost:8080';

// ジェネリック型Tで任意のgRPCサービスに対応できるクライアント生成関数
export const createGrpcClient = <T extends ServiceType>(service: T) => {
    // gRPC-Webトランスポートの設定
    const transport = createGrpcWebTransport({
        baseUrl: GRPC_BASE_URL,
        // クッキーを含めた認証情報の送信を許可
        credentials: "include",
    });

    // Promiseベースのクライアントを生成して返却
    return createPromiseClient(service, transport);
};