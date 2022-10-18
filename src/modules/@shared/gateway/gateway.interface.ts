export default interface GatewayInterface<T> {
    add(entity: T): Promise<void>;
    find(id: string): Promise<T>;
}
