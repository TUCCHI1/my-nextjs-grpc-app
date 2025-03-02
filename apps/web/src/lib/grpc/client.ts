const GRPC_BASE_URL = process.env.NEXT_PUBLIC_GRPC_BASE_URL || 'http://localhost:8080';

export const createGrpcClient = <T extends ServiceType>(service: T) => {
    const transport = createGrpcWebTransport({
        baseUrl: GRPC_BASE_URL,
        credentials: "include",
    });

    return createPromiseClient(service, transport);
}