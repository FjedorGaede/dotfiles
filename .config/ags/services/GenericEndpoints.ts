import { EndpointDefinition } from "./weather";

interface GenericEndpoints {
  [key: string]: EndpointDefinition<any, any>;
}
