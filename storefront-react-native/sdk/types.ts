import { Endpoints as UnifiedEndpoints } from "@vsf-enterprise/unified-api-sapcc";

export type InferSdk<TName extends keyof UnifiedEndpoints> = Awaited<ReturnType<UnifiedEndpoints[TName]>>;

export type InferSdkArgs<TName extends keyof UnifiedEndpoints> = Parameters<UnifiedEndpoints[TName]>[0];