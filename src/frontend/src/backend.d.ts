import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    publishedAt: Time;
    author: string;
    excerpt: string;
    category: string;
}
export type Time = bigint;
export interface TripInquiry {
    destination: string;
    name: string;
    travelDate: Time;
    phone: string;
    specialRequirements: string;
    budgetRange: string;
    numberOfGuests: bigint;
}
export interface backendInterface {
    createBlogPost(title: string, excerpt: string, content: string, category: string, author: string): Promise<void>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllInquiries(): Promise<Array<TripInquiry>>;
    getBlogPostById(id: bigint): Promise<BlogPost>;
    init(): Promise<void>;
    submitInquiry(inquiry: TripInquiry): Promise<void>;
}
