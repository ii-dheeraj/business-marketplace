
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Seller
 * 
 */
export type Seller = $Result.DefaultSelection<Prisma.$SellerPayload>
/**
 * Model DeliveryAgent
 * 
 */
export type DeliveryAgent = $Result.DefaultSelection<Prisma.$DeliveryAgentPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model SellerOrder
 * 
 */
export type SellerOrder = $Result.DefaultSelection<Prisma.$SellerOrderPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model OrderTracking
 * 
 */
export type OrderTracking = $Result.DefaultSelection<Prisma.$OrderTrackingPayload>
/**
 * Model ChatMessage
 * 
 */
export type ChatMessage = $Result.DefaultSelection<Prisma.$ChatMessagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OrderStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PREPARING: 'PREPARING',
  READY_FOR_DELIVERY: 'READY_FOR_DELIVERY',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const TrackingStatus: {
  ORDER_PLACED: 'ORDER_PLACED',
  ORDER_CONFIRMED: 'ORDER_CONFIRMED',
  PREPARING_ORDER: 'PREPARING_ORDER',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  PICKED_UP: 'PICKED_UP',
  IN_TRANSIT: 'IN_TRANSIT',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED'
};

export type TrackingStatus = (typeof TrackingStatus)[keyof typeof TrackingStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const PaymentMethod: {
  PENDING: 'PENDING',
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
  ONLINE_PAYMENT: 'ONLINE_PAYMENT',
  WALLET: 'WALLET'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]

}

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type TrackingStatus = $Enums.TrackingStatus

export const TrackingStatus: typeof $Enums.TrackingStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Customers
 * const customers = await prisma.customer.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Customers
   * const customers = await prisma.customer.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.seller`: Exposes CRUD operations for the **Seller** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sellers
    * const sellers = await prisma.seller.findMany()
    * ```
    */
  get seller(): Prisma.SellerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deliveryAgent`: Exposes CRUD operations for the **DeliveryAgent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeliveryAgents
    * const deliveryAgents = await prisma.deliveryAgent.findMany()
    * ```
    */
  get deliveryAgent(): Prisma.DeliveryAgentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sellerOrder`: Exposes CRUD operations for the **SellerOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SellerOrders
    * const sellerOrders = await prisma.sellerOrder.findMany()
    * ```
    */
  get sellerOrder(): Prisma.SellerOrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderTracking`: Exposes CRUD operations for the **OrderTracking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderTrackings
    * const orderTrackings = await prisma.orderTracking.findMany()
    * ```
    */
  get orderTracking(): Prisma.OrderTrackingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatMessage`: Exposes CRUD operations for the **ChatMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMessages
    * const chatMessages = await prisma.chatMessage.findMany()
    * ```
    */
  get chatMessage(): Prisma.ChatMessageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Customer: 'Customer',
    Seller: 'Seller',
    DeliveryAgent: 'DeliveryAgent',
    Product: 'Product',
    Order: 'Order',
    OrderItem: 'OrderItem',
    SellerOrder: 'SellerOrder',
    Payment: 'Payment',
    OrderTracking: 'OrderTracking',
    ChatMessage: 'ChatMessage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "customer" | "seller" | "deliveryAgent" | "product" | "order" | "orderItem" | "sellerOrder" | "payment" | "orderTracking" | "chatMessage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Seller: {
        payload: Prisma.$SellerPayload<ExtArgs>
        fields: Prisma.SellerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SellerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SellerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>
          }
          findFirst: {
            args: Prisma.SellerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SellerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>
          }
          findMany: {
            args: Prisma.SellerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>[]
          }
          create: {
            args: Prisma.SellerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>
          }
          createMany: {
            args: Prisma.SellerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SellerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>[]
          }
          delete: {
            args: Prisma.SellerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>
          }
          update: {
            args: Prisma.SellerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>
          }
          deleteMany: {
            args: Prisma.SellerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SellerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SellerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>[]
          }
          upsert: {
            args: Prisma.SellerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerPayload>
          }
          aggregate: {
            args: Prisma.SellerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSeller>
          }
          groupBy: {
            args: Prisma.SellerGroupByArgs<ExtArgs>
            result: $Utils.Optional<SellerGroupByOutputType>[]
          }
          count: {
            args: Prisma.SellerCountArgs<ExtArgs>
            result: $Utils.Optional<SellerCountAggregateOutputType> | number
          }
        }
      }
      DeliveryAgent: {
        payload: Prisma.$DeliveryAgentPayload<ExtArgs>
        fields: Prisma.DeliveryAgentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeliveryAgentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAgentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeliveryAgentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAgentPayload>
          }
          findFirst: {
            args: Prisma.DeliveryAgentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAgentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeliveryAgentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAgentPayload>
          }
          findMany: {
            args: Prisma.DeliveryAgentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAgentPayload>[]
          }
          create: {
            args: Prisma.DeliveryAgentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAgentPayload>
          }
          createMany: {
            args: Prisma.DeliveryAgentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeliveryAgentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAgentPayload>[]
          }
          delete: {
            args: Prisma.DeliveryAgentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAgentPayload>
          }
          update: {
            args: Prisma.DeliveryAgentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAgentPayload>
          }
          deleteMany: {
            args: Prisma.DeliveryAgentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeliveryAgentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeliveryAgentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAgentPayload>[]
          }
          upsert: {
            args: Prisma.DeliveryAgentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAgentPayload>
          }
          aggregate: {
            args: Prisma.DeliveryAgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeliveryAgent>
          }
          groupBy: {
            args: Prisma.DeliveryAgentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeliveryAgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeliveryAgentCountArgs<ExtArgs>
            result: $Utils.Optional<DeliveryAgentCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      SellerOrder: {
        payload: Prisma.$SellerOrderPayload<ExtArgs>
        fields: Prisma.SellerOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SellerOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SellerOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerOrderPayload>
          }
          findFirst: {
            args: Prisma.SellerOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SellerOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerOrderPayload>
          }
          findMany: {
            args: Prisma.SellerOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerOrderPayload>[]
          }
          create: {
            args: Prisma.SellerOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerOrderPayload>
          }
          createMany: {
            args: Prisma.SellerOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SellerOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerOrderPayload>[]
          }
          delete: {
            args: Prisma.SellerOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerOrderPayload>
          }
          update: {
            args: Prisma.SellerOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerOrderPayload>
          }
          deleteMany: {
            args: Prisma.SellerOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SellerOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SellerOrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerOrderPayload>[]
          }
          upsert: {
            args: Prisma.SellerOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SellerOrderPayload>
          }
          aggregate: {
            args: Prisma.SellerOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSellerOrder>
          }
          groupBy: {
            args: Prisma.SellerOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<SellerOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.SellerOrderCountArgs<ExtArgs>
            result: $Utils.Optional<SellerOrderCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      OrderTracking: {
        payload: Prisma.$OrderTrackingPayload<ExtArgs>
        fields: Prisma.OrderTrackingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderTrackingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderTrackingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderTrackingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderTrackingPayload>
          }
          findFirst: {
            args: Prisma.OrderTrackingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderTrackingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderTrackingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderTrackingPayload>
          }
          findMany: {
            args: Prisma.OrderTrackingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderTrackingPayload>[]
          }
          create: {
            args: Prisma.OrderTrackingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderTrackingPayload>
          }
          createMany: {
            args: Prisma.OrderTrackingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderTrackingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderTrackingPayload>[]
          }
          delete: {
            args: Prisma.OrderTrackingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderTrackingPayload>
          }
          update: {
            args: Prisma.OrderTrackingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderTrackingPayload>
          }
          deleteMany: {
            args: Prisma.OrderTrackingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderTrackingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderTrackingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderTrackingPayload>[]
          }
          upsert: {
            args: Prisma.OrderTrackingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderTrackingPayload>
          }
          aggregate: {
            args: Prisma.OrderTrackingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderTracking>
          }
          groupBy: {
            args: Prisma.OrderTrackingGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderTrackingGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderTrackingCountArgs<ExtArgs>
            result: $Utils.Optional<OrderTrackingCountAggregateOutputType> | number
          }
        }
      }
      ChatMessage: {
        payload: Prisma.$ChatMessagePayload<ExtArgs>
        fields: Prisma.ChatMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          findFirst: {
            args: Prisma.ChatMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          findMany: {
            args: Prisma.ChatMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          create: {
            args: Prisma.ChatMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          createMany: {
            args: Prisma.ChatMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          delete: {
            args: Prisma.ChatMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          update: {
            args: Prisma.ChatMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          deleteMany: {
            args: Prisma.ChatMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          upsert: {
            args: Prisma.ChatMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          aggregate: {
            args: Prisma.ChatMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatMessage>
          }
          groupBy: {
            args: Prisma.ChatMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ChatMessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    customer?: CustomerOmit
    seller?: SellerOmit
    deliveryAgent?: DeliveryAgentOmit
    product?: ProductOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    sellerOrder?: SellerOrderOmit
    payment?: PaymentOmit
    orderTracking?: OrderTrackingOmit
    chatMessage?: ChatMessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    orders: number
    payments: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | CustomerCountOutputTypeCountOrdersArgs
    payments?: boolean | CustomerCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type SellerCountOutputType
   */

  export type SellerCountOutputType = {
    products: number
    sellerOrders: number
  }

  export type SellerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | SellerCountOutputTypeCountProductsArgs
    sellerOrders?: boolean | SellerCountOutputTypeCountSellerOrdersArgs
  }

  // Custom InputTypes
  /**
   * SellerCountOutputType without action
   */
  export type SellerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerCountOutputType
     */
    select?: SellerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SellerCountOutputType without action
   */
  export type SellerCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * SellerCountOutputType without action
   */
  export type SellerCountOutputTypeCountSellerOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SellerOrderWhereInput
  }


  /**
   * Count Type DeliveryAgentCountOutputType
   */

  export type DeliveryAgentCountOutputType = {
    deliveryOrders: number
  }

  export type DeliveryAgentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveryOrders?: boolean | DeliveryAgentCountOutputTypeCountDeliveryOrdersArgs
  }

  // Custom InputTypes
  /**
   * DeliveryAgentCountOutputType without action
   */
  export type DeliveryAgentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgentCountOutputType
     */
    select?: DeliveryAgentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DeliveryAgentCountOutputType without action
   */
  export type DeliveryAgentCountOutputTypeCountDeliveryOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    orderItems: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
    sellerOrders: number
    payments: number
    tracking: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
    sellerOrders?: boolean | OrderCountOutputTypeCountSellerOrdersArgs
    payments?: boolean | OrderCountOutputTypeCountPaymentsArgs
    tracking?: boolean | OrderCountOutputTypeCountTrackingArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountSellerOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SellerOrderWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountTrackingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderTrackingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    id: number | null
  }

  export type CustomerSumAggregateOutputType = {
    id: number | null
  }

  export type CustomerMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    password: number
    avatar: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    id?: true
  }

  export type CustomerSumAggregateInputType = {
    id?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: number
    name: string
    email: string
    phone: string | null
    password: string
    avatar: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orders?: boolean | Customer$ordersArgs<ExtArgs>
    payments?: boolean | Customer$paymentsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "password" | "avatar" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | Customer$ordersArgs<ExtArgs>
    payments?: boolean | Customer$paymentsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      phone: string | null
      password: string
      avatar: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orders<T extends Customer$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Customer$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Customer$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'Int'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly password: FieldRef<"Customer", 'String'>
    readonly avatar: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.orders
   */
  export type Customer$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Customer.payments
   */
  export type Customer$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Seller
   */

  export type AggregateSeller = {
    _count: SellerCountAggregateOutputType | null
    _avg: SellerAvgAggregateOutputType | null
    _sum: SellerSumAggregateOutputType | null
    _min: SellerMinAggregateOutputType | null
    _max: SellerMaxAggregateOutputType | null
  }

  export type SellerAvgAggregateOutputType = {
    id: number | null
    rating: number | null
    totalReviews: number | null
  }

  export type SellerSumAggregateOutputType = {
    id: number | null
    rating: number | null
    totalReviews: number | null
  }

  export type SellerMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    avatar: string | null
    businessName: string | null
    website: string | null
    category: string | null
    subcategories: string | null
    businessAddress: string | null
    businessCity: string | null
    businessState: string | null
    businessPincode: string | null
    businessArea: string | null
    businessLocality: string | null
    businessDescription: string | null
    businessImage: string | null
    openingHours: string | null
    isVerified: boolean | null
    isPromoted: boolean | null
    rating: number | null
    totalReviews: number | null
    deliveryTime: string | null
    isOpen: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SellerMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    avatar: string | null
    businessName: string | null
    website: string | null
    category: string | null
    subcategories: string | null
    businessAddress: string | null
    businessCity: string | null
    businessState: string | null
    businessPincode: string | null
    businessArea: string | null
    businessLocality: string | null
    businessDescription: string | null
    businessImage: string | null
    openingHours: string | null
    isVerified: boolean | null
    isPromoted: boolean | null
    rating: number | null
    totalReviews: number | null
    deliveryTime: string | null
    isOpen: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SellerCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    password: number
    avatar: number
    businessName: number
    website: number
    category: number
    subcategories: number
    businessAddress: number
    businessCity: number
    businessState: number
    businessPincode: number
    businessArea: number
    businessLocality: number
    businessDescription: number
    businessImage: number
    openingHours: number
    isVerified: number
    isPromoted: number
    rating: number
    totalReviews: number
    deliveryTime: number
    isOpen: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SellerAvgAggregateInputType = {
    id?: true
    rating?: true
    totalReviews?: true
  }

  export type SellerSumAggregateInputType = {
    id?: true
    rating?: true
    totalReviews?: true
  }

  export type SellerMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    avatar?: true
    businessName?: true
    website?: true
    category?: true
    subcategories?: true
    businessAddress?: true
    businessCity?: true
    businessState?: true
    businessPincode?: true
    businessArea?: true
    businessLocality?: true
    businessDescription?: true
    businessImage?: true
    openingHours?: true
    isVerified?: true
    isPromoted?: true
    rating?: true
    totalReviews?: true
    deliveryTime?: true
    isOpen?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SellerMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    avatar?: true
    businessName?: true
    website?: true
    category?: true
    subcategories?: true
    businessAddress?: true
    businessCity?: true
    businessState?: true
    businessPincode?: true
    businessArea?: true
    businessLocality?: true
    businessDescription?: true
    businessImage?: true
    openingHours?: true
    isVerified?: true
    isPromoted?: true
    rating?: true
    totalReviews?: true
    deliveryTime?: true
    isOpen?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SellerCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    avatar?: true
    businessName?: true
    website?: true
    category?: true
    subcategories?: true
    businessAddress?: true
    businessCity?: true
    businessState?: true
    businessPincode?: true
    businessArea?: true
    businessLocality?: true
    businessDescription?: true
    businessImage?: true
    openingHours?: true
    isVerified?: true
    isPromoted?: true
    rating?: true
    totalReviews?: true
    deliveryTime?: true
    isOpen?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SellerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Seller to aggregate.
     */
    where?: SellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sellers to fetch.
     */
    orderBy?: SellerOrderByWithRelationInput | SellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sellers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sellers
    **/
    _count?: true | SellerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SellerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SellerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SellerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SellerMaxAggregateInputType
  }

  export type GetSellerAggregateType<T extends SellerAggregateArgs> = {
        [P in keyof T & keyof AggregateSeller]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSeller[P]>
      : GetScalarType<T[P], AggregateSeller[P]>
  }




  export type SellerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SellerWhereInput
    orderBy?: SellerOrderByWithAggregationInput | SellerOrderByWithAggregationInput[]
    by: SellerScalarFieldEnum[] | SellerScalarFieldEnum
    having?: SellerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SellerCountAggregateInputType | true
    _avg?: SellerAvgAggregateInputType
    _sum?: SellerSumAggregateInputType
    _min?: SellerMinAggregateInputType
    _max?: SellerMaxAggregateInputType
  }

  export type SellerGroupByOutputType = {
    id: number
    name: string
    email: string
    phone: string | null
    password: string
    avatar: string | null
    businessName: string
    website: string | null
    category: string
    subcategories: string
    businessAddress: string
    businessCity: string
    businessState: string
    businessPincode: string
    businessArea: string | null
    businessLocality: string | null
    businessDescription: string | null
    businessImage: string | null
    openingHours: string | null
    isVerified: boolean
    isPromoted: boolean
    rating: number
    totalReviews: number
    deliveryTime: string | null
    isOpen: boolean
    createdAt: Date
    updatedAt: Date
    _count: SellerCountAggregateOutputType | null
    _avg: SellerAvgAggregateOutputType | null
    _sum: SellerSumAggregateOutputType | null
    _min: SellerMinAggregateOutputType | null
    _max: SellerMaxAggregateOutputType | null
  }

  type GetSellerGroupByPayload<T extends SellerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SellerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SellerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SellerGroupByOutputType[P]>
            : GetScalarType<T[P], SellerGroupByOutputType[P]>
        }
      >
    >


  export type SellerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    avatar?: boolean
    businessName?: boolean
    website?: boolean
    category?: boolean
    subcategories?: boolean
    businessAddress?: boolean
    businessCity?: boolean
    businessState?: boolean
    businessPincode?: boolean
    businessArea?: boolean
    businessLocality?: boolean
    businessDescription?: boolean
    businessImage?: boolean
    openingHours?: boolean
    isVerified?: boolean
    isPromoted?: boolean
    rating?: boolean
    totalReviews?: boolean
    deliveryTime?: boolean
    isOpen?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    products?: boolean | Seller$productsArgs<ExtArgs>
    sellerOrders?: boolean | Seller$sellerOrdersArgs<ExtArgs>
    _count?: boolean | SellerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["seller"]>

  export type SellerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    avatar?: boolean
    businessName?: boolean
    website?: boolean
    category?: boolean
    subcategories?: boolean
    businessAddress?: boolean
    businessCity?: boolean
    businessState?: boolean
    businessPincode?: boolean
    businessArea?: boolean
    businessLocality?: boolean
    businessDescription?: boolean
    businessImage?: boolean
    openingHours?: boolean
    isVerified?: boolean
    isPromoted?: boolean
    rating?: boolean
    totalReviews?: boolean
    deliveryTime?: boolean
    isOpen?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["seller"]>

  export type SellerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    avatar?: boolean
    businessName?: boolean
    website?: boolean
    category?: boolean
    subcategories?: boolean
    businessAddress?: boolean
    businessCity?: boolean
    businessState?: boolean
    businessPincode?: boolean
    businessArea?: boolean
    businessLocality?: boolean
    businessDescription?: boolean
    businessImage?: boolean
    openingHours?: boolean
    isVerified?: boolean
    isPromoted?: boolean
    rating?: boolean
    totalReviews?: boolean
    deliveryTime?: boolean
    isOpen?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["seller"]>

  export type SellerSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    avatar?: boolean
    businessName?: boolean
    website?: boolean
    category?: boolean
    subcategories?: boolean
    businessAddress?: boolean
    businessCity?: boolean
    businessState?: boolean
    businessPincode?: boolean
    businessArea?: boolean
    businessLocality?: boolean
    businessDescription?: boolean
    businessImage?: boolean
    openingHours?: boolean
    isVerified?: boolean
    isPromoted?: boolean
    rating?: boolean
    totalReviews?: boolean
    deliveryTime?: boolean
    isOpen?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SellerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "password" | "avatar" | "businessName" | "website" | "category" | "subcategories" | "businessAddress" | "businessCity" | "businessState" | "businessPincode" | "businessArea" | "businessLocality" | "businessDescription" | "businessImage" | "openingHours" | "isVerified" | "isPromoted" | "rating" | "totalReviews" | "deliveryTime" | "isOpen" | "createdAt" | "updatedAt", ExtArgs["result"]["seller"]>
  export type SellerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Seller$productsArgs<ExtArgs>
    sellerOrders?: boolean | Seller$sellerOrdersArgs<ExtArgs>
    _count?: boolean | SellerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SellerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SellerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SellerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Seller"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
      sellerOrders: Prisma.$SellerOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      phone: string | null
      password: string
      avatar: string | null
      businessName: string
      website: string | null
      category: string
      subcategories: string
      businessAddress: string
      businessCity: string
      businessState: string
      businessPincode: string
      businessArea: string | null
      businessLocality: string | null
      businessDescription: string | null
      businessImage: string | null
      openingHours: string | null
      isVerified: boolean
      isPromoted: boolean
      rating: number
      totalReviews: number
      deliveryTime: string | null
      isOpen: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["seller"]>
    composites: {}
  }

  type SellerGetPayload<S extends boolean | null | undefined | SellerDefaultArgs> = $Result.GetResult<Prisma.$SellerPayload, S>

  type SellerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SellerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SellerCountAggregateInputType | true
    }

  export interface SellerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Seller'], meta: { name: 'Seller' } }
    /**
     * Find zero or one Seller that matches the filter.
     * @param {SellerFindUniqueArgs} args - Arguments to find a Seller
     * @example
     * // Get one Seller
     * const seller = await prisma.seller.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SellerFindUniqueArgs>(args: SelectSubset<T, SellerFindUniqueArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Seller that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SellerFindUniqueOrThrowArgs} args - Arguments to find a Seller
     * @example
     * // Get one Seller
     * const seller = await prisma.seller.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SellerFindUniqueOrThrowArgs>(args: SelectSubset<T, SellerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Seller that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerFindFirstArgs} args - Arguments to find a Seller
     * @example
     * // Get one Seller
     * const seller = await prisma.seller.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SellerFindFirstArgs>(args?: SelectSubset<T, SellerFindFirstArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Seller that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerFindFirstOrThrowArgs} args - Arguments to find a Seller
     * @example
     * // Get one Seller
     * const seller = await prisma.seller.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SellerFindFirstOrThrowArgs>(args?: SelectSubset<T, SellerFindFirstOrThrowArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sellers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sellers
     * const sellers = await prisma.seller.findMany()
     * 
     * // Get first 10 Sellers
     * const sellers = await prisma.seller.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sellerWithIdOnly = await prisma.seller.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SellerFindManyArgs>(args?: SelectSubset<T, SellerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Seller.
     * @param {SellerCreateArgs} args - Arguments to create a Seller.
     * @example
     * // Create one Seller
     * const Seller = await prisma.seller.create({
     *   data: {
     *     // ... data to create a Seller
     *   }
     * })
     * 
     */
    create<T extends SellerCreateArgs>(args: SelectSubset<T, SellerCreateArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sellers.
     * @param {SellerCreateManyArgs} args - Arguments to create many Sellers.
     * @example
     * // Create many Sellers
     * const seller = await prisma.seller.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SellerCreateManyArgs>(args?: SelectSubset<T, SellerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sellers and returns the data saved in the database.
     * @param {SellerCreateManyAndReturnArgs} args - Arguments to create many Sellers.
     * @example
     * // Create many Sellers
     * const seller = await prisma.seller.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sellers and only return the `id`
     * const sellerWithIdOnly = await prisma.seller.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SellerCreateManyAndReturnArgs>(args?: SelectSubset<T, SellerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Seller.
     * @param {SellerDeleteArgs} args - Arguments to delete one Seller.
     * @example
     * // Delete one Seller
     * const Seller = await prisma.seller.delete({
     *   where: {
     *     // ... filter to delete one Seller
     *   }
     * })
     * 
     */
    delete<T extends SellerDeleteArgs>(args: SelectSubset<T, SellerDeleteArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Seller.
     * @param {SellerUpdateArgs} args - Arguments to update one Seller.
     * @example
     * // Update one Seller
     * const seller = await prisma.seller.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SellerUpdateArgs>(args: SelectSubset<T, SellerUpdateArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sellers.
     * @param {SellerDeleteManyArgs} args - Arguments to filter Sellers to delete.
     * @example
     * // Delete a few Sellers
     * const { count } = await prisma.seller.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SellerDeleteManyArgs>(args?: SelectSubset<T, SellerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sellers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sellers
     * const seller = await prisma.seller.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SellerUpdateManyArgs>(args: SelectSubset<T, SellerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sellers and returns the data updated in the database.
     * @param {SellerUpdateManyAndReturnArgs} args - Arguments to update many Sellers.
     * @example
     * // Update many Sellers
     * const seller = await prisma.seller.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sellers and only return the `id`
     * const sellerWithIdOnly = await prisma.seller.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SellerUpdateManyAndReturnArgs>(args: SelectSubset<T, SellerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Seller.
     * @param {SellerUpsertArgs} args - Arguments to update or create a Seller.
     * @example
     * // Update or create a Seller
     * const seller = await prisma.seller.upsert({
     *   create: {
     *     // ... data to create a Seller
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Seller we want to update
     *   }
     * })
     */
    upsert<T extends SellerUpsertArgs>(args: SelectSubset<T, SellerUpsertArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sellers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerCountArgs} args - Arguments to filter Sellers to count.
     * @example
     * // Count the number of Sellers
     * const count = await prisma.seller.count({
     *   where: {
     *     // ... the filter for the Sellers we want to count
     *   }
     * })
    **/
    count<T extends SellerCountArgs>(
      args?: Subset<T, SellerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SellerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Seller.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SellerAggregateArgs>(args: Subset<T, SellerAggregateArgs>): Prisma.PrismaPromise<GetSellerAggregateType<T>>

    /**
     * Group by Seller.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SellerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SellerGroupByArgs['orderBy'] }
        : { orderBy?: SellerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SellerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSellerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Seller model
   */
  readonly fields: SellerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Seller.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SellerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Seller$productsArgs<ExtArgs> = {}>(args?: Subset<T, Seller$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sellerOrders<T extends Seller$sellerOrdersArgs<ExtArgs> = {}>(args?: Subset<T, Seller$sellerOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Seller model
   */
  interface SellerFieldRefs {
    readonly id: FieldRef<"Seller", 'Int'>
    readonly name: FieldRef<"Seller", 'String'>
    readonly email: FieldRef<"Seller", 'String'>
    readonly phone: FieldRef<"Seller", 'String'>
    readonly password: FieldRef<"Seller", 'String'>
    readonly avatar: FieldRef<"Seller", 'String'>
    readonly businessName: FieldRef<"Seller", 'String'>
    readonly website: FieldRef<"Seller", 'String'>
    readonly category: FieldRef<"Seller", 'String'>
    readonly subcategories: FieldRef<"Seller", 'String'>
    readonly businessAddress: FieldRef<"Seller", 'String'>
    readonly businessCity: FieldRef<"Seller", 'String'>
    readonly businessState: FieldRef<"Seller", 'String'>
    readonly businessPincode: FieldRef<"Seller", 'String'>
    readonly businessArea: FieldRef<"Seller", 'String'>
    readonly businessLocality: FieldRef<"Seller", 'String'>
    readonly businessDescription: FieldRef<"Seller", 'String'>
    readonly businessImage: FieldRef<"Seller", 'String'>
    readonly openingHours: FieldRef<"Seller", 'String'>
    readonly isVerified: FieldRef<"Seller", 'Boolean'>
    readonly isPromoted: FieldRef<"Seller", 'Boolean'>
    readonly rating: FieldRef<"Seller", 'Float'>
    readonly totalReviews: FieldRef<"Seller", 'Int'>
    readonly deliveryTime: FieldRef<"Seller", 'String'>
    readonly isOpen: FieldRef<"Seller", 'Boolean'>
    readonly createdAt: FieldRef<"Seller", 'DateTime'>
    readonly updatedAt: FieldRef<"Seller", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Seller findUnique
   */
  export type SellerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * Filter, which Seller to fetch.
     */
    where: SellerWhereUniqueInput
  }

  /**
   * Seller findUniqueOrThrow
   */
  export type SellerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * Filter, which Seller to fetch.
     */
    where: SellerWhereUniqueInput
  }

  /**
   * Seller findFirst
   */
  export type SellerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * Filter, which Seller to fetch.
     */
    where?: SellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sellers to fetch.
     */
    orderBy?: SellerOrderByWithRelationInput | SellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sellers.
     */
    cursor?: SellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sellers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sellers.
     */
    distinct?: SellerScalarFieldEnum | SellerScalarFieldEnum[]
  }

  /**
   * Seller findFirstOrThrow
   */
  export type SellerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * Filter, which Seller to fetch.
     */
    where?: SellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sellers to fetch.
     */
    orderBy?: SellerOrderByWithRelationInput | SellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sellers.
     */
    cursor?: SellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sellers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sellers.
     */
    distinct?: SellerScalarFieldEnum | SellerScalarFieldEnum[]
  }

  /**
   * Seller findMany
   */
  export type SellerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * Filter, which Sellers to fetch.
     */
    where?: SellerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sellers to fetch.
     */
    orderBy?: SellerOrderByWithRelationInput | SellerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sellers.
     */
    cursor?: SellerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sellers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sellers.
     */
    skip?: number
    distinct?: SellerScalarFieldEnum | SellerScalarFieldEnum[]
  }

  /**
   * Seller create
   */
  export type SellerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * The data needed to create a Seller.
     */
    data: XOR<SellerCreateInput, SellerUncheckedCreateInput>
  }

  /**
   * Seller createMany
   */
  export type SellerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sellers.
     */
    data: SellerCreateManyInput | SellerCreateManyInput[]
  }

  /**
   * Seller createManyAndReturn
   */
  export type SellerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * The data used to create many Sellers.
     */
    data: SellerCreateManyInput | SellerCreateManyInput[]
  }

  /**
   * Seller update
   */
  export type SellerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * The data needed to update a Seller.
     */
    data: XOR<SellerUpdateInput, SellerUncheckedUpdateInput>
    /**
     * Choose, which Seller to update.
     */
    where: SellerWhereUniqueInput
  }

  /**
   * Seller updateMany
   */
  export type SellerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sellers.
     */
    data: XOR<SellerUpdateManyMutationInput, SellerUncheckedUpdateManyInput>
    /**
     * Filter which Sellers to update
     */
    where?: SellerWhereInput
    /**
     * Limit how many Sellers to update.
     */
    limit?: number
  }

  /**
   * Seller updateManyAndReturn
   */
  export type SellerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * The data used to update Sellers.
     */
    data: XOR<SellerUpdateManyMutationInput, SellerUncheckedUpdateManyInput>
    /**
     * Filter which Sellers to update
     */
    where?: SellerWhereInput
    /**
     * Limit how many Sellers to update.
     */
    limit?: number
  }

  /**
   * Seller upsert
   */
  export type SellerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * The filter to search for the Seller to update in case it exists.
     */
    where: SellerWhereUniqueInput
    /**
     * In case the Seller found by the `where` argument doesn't exist, create a new Seller with this data.
     */
    create: XOR<SellerCreateInput, SellerUncheckedCreateInput>
    /**
     * In case the Seller was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SellerUpdateInput, SellerUncheckedUpdateInput>
  }

  /**
   * Seller delete
   */
  export type SellerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
    /**
     * Filter which Seller to delete.
     */
    where: SellerWhereUniqueInput
  }

  /**
   * Seller deleteMany
   */
  export type SellerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sellers to delete
     */
    where?: SellerWhereInput
    /**
     * Limit how many Sellers to delete.
     */
    limit?: number
  }

  /**
   * Seller.products
   */
  export type Seller$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Seller.sellerOrders
   */
  export type Seller$sellerOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderInclude<ExtArgs> | null
    where?: SellerOrderWhereInput
    orderBy?: SellerOrderOrderByWithRelationInput | SellerOrderOrderByWithRelationInput[]
    cursor?: SellerOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SellerOrderScalarFieldEnum | SellerOrderScalarFieldEnum[]
  }

  /**
   * Seller without action
   */
  export type SellerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seller
     */
    select?: SellerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seller
     */
    omit?: SellerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerInclude<ExtArgs> | null
  }


  /**
   * Model DeliveryAgent
   */

  export type AggregateDeliveryAgent = {
    _count: DeliveryAgentCountAggregateOutputType | null
    _avg: DeliveryAgentAvgAggregateOutputType | null
    _sum: DeliveryAgentSumAggregateOutputType | null
    _min: DeliveryAgentMinAggregateOutputType | null
    _max: DeliveryAgentMaxAggregateOutputType | null
  }

  export type DeliveryAgentAvgAggregateOutputType = {
    id: number | null
  }

  export type DeliveryAgentSumAggregateOutputType = {
    id: number | null
  }

  export type DeliveryAgentMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    avatar: string | null
    vehicleNumber: string | null
    vehicleType: string | null
    isAvailable: boolean | null
    currentLocation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeliveryAgentMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    avatar: string | null
    vehicleNumber: string | null
    vehicleType: string | null
    isAvailable: boolean | null
    currentLocation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeliveryAgentCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    password: number
    avatar: number
    vehicleNumber: number
    vehicleType: number
    isAvailable: number
    currentLocation: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeliveryAgentAvgAggregateInputType = {
    id?: true
  }

  export type DeliveryAgentSumAggregateInputType = {
    id?: true
  }

  export type DeliveryAgentMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    avatar?: true
    vehicleNumber?: true
    vehicleType?: true
    isAvailable?: true
    currentLocation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeliveryAgentMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    avatar?: true
    vehicleNumber?: true
    vehicleType?: true
    isAvailable?: true
    currentLocation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeliveryAgentCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    avatar?: true
    vehicleNumber?: true
    vehicleType?: true
    isAvailable?: true
    currentLocation?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeliveryAgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeliveryAgent to aggregate.
     */
    where?: DeliveryAgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryAgents to fetch.
     */
    orderBy?: DeliveryAgentOrderByWithRelationInput | DeliveryAgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeliveryAgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryAgents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryAgents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeliveryAgents
    **/
    _count?: true | DeliveryAgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeliveryAgentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeliveryAgentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeliveryAgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeliveryAgentMaxAggregateInputType
  }

  export type GetDeliveryAgentAggregateType<T extends DeliveryAgentAggregateArgs> = {
        [P in keyof T & keyof AggregateDeliveryAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeliveryAgent[P]>
      : GetScalarType<T[P], AggregateDeliveryAgent[P]>
  }




  export type DeliveryAgentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryAgentWhereInput
    orderBy?: DeliveryAgentOrderByWithAggregationInput | DeliveryAgentOrderByWithAggregationInput[]
    by: DeliveryAgentScalarFieldEnum[] | DeliveryAgentScalarFieldEnum
    having?: DeliveryAgentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeliveryAgentCountAggregateInputType | true
    _avg?: DeliveryAgentAvgAggregateInputType
    _sum?: DeliveryAgentSumAggregateInputType
    _min?: DeliveryAgentMinAggregateInputType
    _max?: DeliveryAgentMaxAggregateInputType
  }

  export type DeliveryAgentGroupByOutputType = {
    id: number
    name: string
    email: string
    phone: string | null
    password: string
    avatar: string | null
    vehicleNumber: string
    vehicleType: string
    isAvailable: boolean
    currentLocation: string | null
    createdAt: Date
    updatedAt: Date
    _count: DeliveryAgentCountAggregateOutputType | null
    _avg: DeliveryAgentAvgAggregateOutputType | null
    _sum: DeliveryAgentSumAggregateOutputType | null
    _min: DeliveryAgentMinAggregateOutputType | null
    _max: DeliveryAgentMaxAggregateOutputType | null
  }

  type GetDeliveryAgentGroupByPayload<T extends DeliveryAgentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeliveryAgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeliveryAgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeliveryAgentGroupByOutputType[P]>
            : GetScalarType<T[P], DeliveryAgentGroupByOutputType[P]>
        }
      >
    >


  export type DeliveryAgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    avatar?: boolean
    vehicleNumber?: boolean
    vehicleType?: boolean
    isAvailable?: boolean
    currentLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deliveryOrders?: boolean | DeliveryAgent$deliveryOrdersArgs<ExtArgs>
    _count?: boolean | DeliveryAgentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deliveryAgent"]>

  export type DeliveryAgentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    avatar?: boolean
    vehicleNumber?: boolean
    vehicleType?: boolean
    isAvailable?: boolean
    currentLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["deliveryAgent"]>

  export type DeliveryAgentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    avatar?: boolean
    vehicleNumber?: boolean
    vehicleType?: boolean
    isAvailable?: boolean
    currentLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["deliveryAgent"]>

  export type DeliveryAgentSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    avatar?: boolean
    vehicleNumber?: boolean
    vehicleType?: boolean
    isAvailable?: boolean
    currentLocation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeliveryAgentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "password" | "avatar" | "vehicleNumber" | "vehicleType" | "isAvailable" | "currentLocation" | "createdAt" | "updatedAt", ExtArgs["result"]["deliveryAgent"]>
  export type DeliveryAgentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveryOrders?: boolean | DeliveryAgent$deliveryOrdersArgs<ExtArgs>
    _count?: boolean | DeliveryAgentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DeliveryAgentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DeliveryAgentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DeliveryAgentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeliveryAgent"
    objects: {
      deliveryOrders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      phone: string | null
      password: string
      avatar: string | null
      vehicleNumber: string
      vehicleType: string
      isAvailable: boolean
      currentLocation: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["deliveryAgent"]>
    composites: {}
  }

  type DeliveryAgentGetPayload<S extends boolean | null | undefined | DeliveryAgentDefaultArgs> = $Result.GetResult<Prisma.$DeliveryAgentPayload, S>

  type DeliveryAgentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeliveryAgentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeliveryAgentCountAggregateInputType | true
    }

  export interface DeliveryAgentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeliveryAgent'], meta: { name: 'DeliveryAgent' } }
    /**
     * Find zero or one DeliveryAgent that matches the filter.
     * @param {DeliveryAgentFindUniqueArgs} args - Arguments to find a DeliveryAgent
     * @example
     * // Get one DeliveryAgent
     * const deliveryAgent = await prisma.deliveryAgent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeliveryAgentFindUniqueArgs>(args: SelectSubset<T, DeliveryAgentFindUniqueArgs<ExtArgs>>): Prisma__DeliveryAgentClient<$Result.GetResult<Prisma.$DeliveryAgentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DeliveryAgent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeliveryAgentFindUniqueOrThrowArgs} args - Arguments to find a DeliveryAgent
     * @example
     * // Get one DeliveryAgent
     * const deliveryAgent = await prisma.deliveryAgent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeliveryAgentFindUniqueOrThrowArgs>(args: SelectSubset<T, DeliveryAgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeliveryAgentClient<$Result.GetResult<Prisma.$DeliveryAgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeliveryAgent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAgentFindFirstArgs} args - Arguments to find a DeliveryAgent
     * @example
     * // Get one DeliveryAgent
     * const deliveryAgent = await prisma.deliveryAgent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeliveryAgentFindFirstArgs>(args?: SelectSubset<T, DeliveryAgentFindFirstArgs<ExtArgs>>): Prisma__DeliveryAgentClient<$Result.GetResult<Prisma.$DeliveryAgentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeliveryAgent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAgentFindFirstOrThrowArgs} args - Arguments to find a DeliveryAgent
     * @example
     * // Get one DeliveryAgent
     * const deliveryAgent = await prisma.deliveryAgent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeliveryAgentFindFirstOrThrowArgs>(args?: SelectSubset<T, DeliveryAgentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeliveryAgentClient<$Result.GetResult<Prisma.$DeliveryAgentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DeliveryAgents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeliveryAgents
     * const deliveryAgents = await prisma.deliveryAgent.findMany()
     * 
     * // Get first 10 DeliveryAgents
     * const deliveryAgents = await prisma.deliveryAgent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deliveryAgentWithIdOnly = await prisma.deliveryAgent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeliveryAgentFindManyArgs>(args?: SelectSubset<T, DeliveryAgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryAgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DeliveryAgent.
     * @param {DeliveryAgentCreateArgs} args - Arguments to create a DeliveryAgent.
     * @example
     * // Create one DeliveryAgent
     * const DeliveryAgent = await prisma.deliveryAgent.create({
     *   data: {
     *     // ... data to create a DeliveryAgent
     *   }
     * })
     * 
     */
    create<T extends DeliveryAgentCreateArgs>(args: SelectSubset<T, DeliveryAgentCreateArgs<ExtArgs>>): Prisma__DeliveryAgentClient<$Result.GetResult<Prisma.$DeliveryAgentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DeliveryAgents.
     * @param {DeliveryAgentCreateManyArgs} args - Arguments to create many DeliveryAgents.
     * @example
     * // Create many DeliveryAgents
     * const deliveryAgent = await prisma.deliveryAgent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeliveryAgentCreateManyArgs>(args?: SelectSubset<T, DeliveryAgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeliveryAgents and returns the data saved in the database.
     * @param {DeliveryAgentCreateManyAndReturnArgs} args - Arguments to create many DeliveryAgents.
     * @example
     * // Create many DeliveryAgents
     * const deliveryAgent = await prisma.deliveryAgent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeliveryAgents and only return the `id`
     * const deliveryAgentWithIdOnly = await prisma.deliveryAgent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeliveryAgentCreateManyAndReturnArgs>(args?: SelectSubset<T, DeliveryAgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryAgentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DeliveryAgent.
     * @param {DeliveryAgentDeleteArgs} args - Arguments to delete one DeliveryAgent.
     * @example
     * // Delete one DeliveryAgent
     * const DeliveryAgent = await prisma.deliveryAgent.delete({
     *   where: {
     *     // ... filter to delete one DeliveryAgent
     *   }
     * })
     * 
     */
    delete<T extends DeliveryAgentDeleteArgs>(args: SelectSubset<T, DeliveryAgentDeleteArgs<ExtArgs>>): Prisma__DeliveryAgentClient<$Result.GetResult<Prisma.$DeliveryAgentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DeliveryAgent.
     * @param {DeliveryAgentUpdateArgs} args - Arguments to update one DeliveryAgent.
     * @example
     * // Update one DeliveryAgent
     * const deliveryAgent = await prisma.deliveryAgent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeliveryAgentUpdateArgs>(args: SelectSubset<T, DeliveryAgentUpdateArgs<ExtArgs>>): Prisma__DeliveryAgentClient<$Result.GetResult<Prisma.$DeliveryAgentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DeliveryAgents.
     * @param {DeliveryAgentDeleteManyArgs} args - Arguments to filter DeliveryAgents to delete.
     * @example
     * // Delete a few DeliveryAgents
     * const { count } = await prisma.deliveryAgent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeliveryAgentDeleteManyArgs>(args?: SelectSubset<T, DeliveryAgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeliveryAgents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeliveryAgents
     * const deliveryAgent = await prisma.deliveryAgent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeliveryAgentUpdateManyArgs>(args: SelectSubset<T, DeliveryAgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeliveryAgents and returns the data updated in the database.
     * @param {DeliveryAgentUpdateManyAndReturnArgs} args - Arguments to update many DeliveryAgents.
     * @example
     * // Update many DeliveryAgents
     * const deliveryAgent = await prisma.deliveryAgent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DeliveryAgents and only return the `id`
     * const deliveryAgentWithIdOnly = await prisma.deliveryAgent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeliveryAgentUpdateManyAndReturnArgs>(args: SelectSubset<T, DeliveryAgentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryAgentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DeliveryAgent.
     * @param {DeliveryAgentUpsertArgs} args - Arguments to update or create a DeliveryAgent.
     * @example
     * // Update or create a DeliveryAgent
     * const deliveryAgent = await prisma.deliveryAgent.upsert({
     *   create: {
     *     // ... data to create a DeliveryAgent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeliveryAgent we want to update
     *   }
     * })
     */
    upsert<T extends DeliveryAgentUpsertArgs>(args: SelectSubset<T, DeliveryAgentUpsertArgs<ExtArgs>>): Prisma__DeliveryAgentClient<$Result.GetResult<Prisma.$DeliveryAgentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DeliveryAgents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAgentCountArgs} args - Arguments to filter DeliveryAgents to count.
     * @example
     * // Count the number of DeliveryAgents
     * const count = await prisma.deliveryAgent.count({
     *   where: {
     *     // ... the filter for the DeliveryAgents we want to count
     *   }
     * })
    **/
    count<T extends DeliveryAgentCountArgs>(
      args?: Subset<T, DeliveryAgentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeliveryAgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeliveryAgent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeliveryAgentAggregateArgs>(args: Subset<T, DeliveryAgentAggregateArgs>): Prisma.PrismaPromise<GetDeliveryAgentAggregateType<T>>

    /**
     * Group by DeliveryAgent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAgentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeliveryAgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeliveryAgentGroupByArgs['orderBy'] }
        : { orderBy?: DeliveryAgentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeliveryAgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeliveryAgent model
   */
  readonly fields: DeliveryAgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeliveryAgent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeliveryAgentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deliveryOrders<T extends DeliveryAgent$deliveryOrdersArgs<ExtArgs> = {}>(args?: Subset<T, DeliveryAgent$deliveryOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DeliveryAgent model
   */
  interface DeliveryAgentFieldRefs {
    readonly id: FieldRef<"DeliveryAgent", 'Int'>
    readonly name: FieldRef<"DeliveryAgent", 'String'>
    readonly email: FieldRef<"DeliveryAgent", 'String'>
    readonly phone: FieldRef<"DeliveryAgent", 'String'>
    readonly password: FieldRef<"DeliveryAgent", 'String'>
    readonly avatar: FieldRef<"DeliveryAgent", 'String'>
    readonly vehicleNumber: FieldRef<"DeliveryAgent", 'String'>
    readonly vehicleType: FieldRef<"DeliveryAgent", 'String'>
    readonly isAvailable: FieldRef<"DeliveryAgent", 'Boolean'>
    readonly currentLocation: FieldRef<"DeliveryAgent", 'String'>
    readonly createdAt: FieldRef<"DeliveryAgent", 'DateTime'>
    readonly updatedAt: FieldRef<"DeliveryAgent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeliveryAgent findUnique
   */
  export type DeliveryAgentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryAgentInclude<ExtArgs> | null
    /**
     * Filter, which DeliveryAgent to fetch.
     */
    where: DeliveryAgentWhereUniqueInput
  }

  /**
   * DeliveryAgent findUniqueOrThrow
   */
  export type DeliveryAgentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryAgentInclude<ExtArgs> | null
    /**
     * Filter, which DeliveryAgent to fetch.
     */
    where: DeliveryAgentWhereUniqueInput
  }

  /**
   * DeliveryAgent findFirst
   */
  export type DeliveryAgentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryAgentInclude<ExtArgs> | null
    /**
     * Filter, which DeliveryAgent to fetch.
     */
    where?: DeliveryAgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryAgents to fetch.
     */
    orderBy?: DeliveryAgentOrderByWithRelationInput | DeliveryAgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeliveryAgents.
     */
    cursor?: DeliveryAgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryAgents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryAgents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryAgents.
     */
    distinct?: DeliveryAgentScalarFieldEnum | DeliveryAgentScalarFieldEnum[]
  }

  /**
   * DeliveryAgent findFirstOrThrow
   */
  export type DeliveryAgentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryAgentInclude<ExtArgs> | null
    /**
     * Filter, which DeliveryAgent to fetch.
     */
    where?: DeliveryAgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryAgents to fetch.
     */
    orderBy?: DeliveryAgentOrderByWithRelationInput | DeliveryAgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeliveryAgents.
     */
    cursor?: DeliveryAgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryAgents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryAgents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryAgents.
     */
    distinct?: DeliveryAgentScalarFieldEnum | DeliveryAgentScalarFieldEnum[]
  }

  /**
   * DeliveryAgent findMany
   */
  export type DeliveryAgentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryAgentInclude<ExtArgs> | null
    /**
     * Filter, which DeliveryAgents to fetch.
     */
    where?: DeliveryAgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryAgents to fetch.
     */
    orderBy?: DeliveryAgentOrderByWithRelationInput | DeliveryAgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeliveryAgents.
     */
    cursor?: DeliveryAgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryAgents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryAgents.
     */
    skip?: number
    distinct?: DeliveryAgentScalarFieldEnum | DeliveryAgentScalarFieldEnum[]
  }

  /**
   * DeliveryAgent create
   */
  export type DeliveryAgentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryAgentInclude<ExtArgs> | null
    /**
     * The data needed to create a DeliveryAgent.
     */
    data: XOR<DeliveryAgentCreateInput, DeliveryAgentUncheckedCreateInput>
  }

  /**
   * DeliveryAgent createMany
   */
  export type DeliveryAgentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeliveryAgents.
     */
    data: DeliveryAgentCreateManyInput | DeliveryAgentCreateManyInput[]
  }

  /**
   * DeliveryAgent createManyAndReturn
   */
  export type DeliveryAgentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * The data used to create many DeliveryAgents.
     */
    data: DeliveryAgentCreateManyInput | DeliveryAgentCreateManyInput[]
  }

  /**
   * DeliveryAgent update
   */
  export type DeliveryAgentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryAgentInclude<ExtArgs> | null
    /**
     * The data needed to update a DeliveryAgent.
     */
    data: XOR<DeliveryAgentUpdateInput, DeliveryAgentUncheckedUpdateInput>
    /**
     * Choose, which DeliveryAgent to update.
     */
    where: DeliveryAgentWhereUniqueInput
  }

  /**
   * DeliveryAgent updateMany
   */
  export type DeliveryAgentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeliveryAgents.
     */
    data: XOR<DeliveryAgentUpdateManyMutationInput, DeliveryAgentUncheckedUpdateManyInput>
    /**
     * Filter which DeliveryAgents to update
     */
    where?: DeliveryAgentWhereInput
    /**
     * Limit how many DeliveryAgents to update.
     */
    limit?: number
  }

  /**
   * DeliveryAgent updateManyAndReturn
   */
  export type DeliveryAgentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * The data used to update DeliveryAgents.
     */
    data: XOR<DeliveryAgentUpdateManyMutationInput, DeliveryAgentUncheckedUpdateManyInput>
    /**
     * Filter which DeliveryAgents to update
     */
    where?: DeliveryAgentWhereInput
    /**
     * Limit how many DeliveryAgents to update.
     */
    limit?: number
  }

  /**
   * DeliveryAgent upsert
   */
  export type DeliveryAgentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryAgentInclude<ExtArgs> | null
    /**
     * The filter to search for the DeliveryAgent to update in case it exists.
     */
    where: DeliveryAgentWhereUniqueInput
    /**
     * In case the DeliveryAgent found by the `where` argument doesn't exist, create a new DeliveryAgent with this data.
     */
    create: XOR<DeliveryAgentCreateInput, DeliveryAgentUncheckedCreateInput>
    /**
     * In case the DeliveryAgent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeliveryAgentUpdateInput, DeliveryAgentUncheckedUpdateInput>
  }

  /**
   * DeliveryAgent delete
   */
  export type DeliveryAgentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryAgentInclude<ExtArgs> | null
    /**
     * Filter which DeliveryAgent to delete.
     */
    where: DeliveryAgentWhereUniqueInput
  }

  /**
   * DeliveryAgent deleteMany
   */
  export type DeliveryAgentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeliveryAgents to delete
     */
    where?: DeliveryAgentWhereInput
    /**
     * Limit how many DeliveryAgents to delete.
     */
    limit?: number
  }

  /**
   * DeliveryAgent.deliveryOrders
   */
  export type DeliveryAgent$deliveryOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * DeliveryAgent without action
   */
  export type DeliveryAgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryAgentInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    price: number | null
    originalPrice: number | null
    stock: number | null
    sellerId: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    price: number | null
    originalPrice: number | null
    stock: number | null
    sellerId: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    price: number | null
    originalPrice: number | null
    image: string | null
    category: string | null
    subcategory: string | null
    stock: number | null
    inStock: boolean | null
    isActive: boolean | null
    sellerId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    price: number | null
    originalPrice: number | null
    image: string | null
    category: string | null
    subcategory: string | null
    stock: number | null
    inStock: boolean | null
    isActive: boolean | null
    sellerId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    description: number
    price: number
    originalPrice: number
    image: number
    category: number
    subcategory: number
    stock: number
    inStock: number
    isActive: number
    sellerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    price?: true
    originalPrice?: true
    stock?: true
    sellerId?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    price?: true
    originalPrice?: true
    stock?: true
    sellerId?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    originalPrice?: true
    image?: true
    category?: true
    subcategory?: true
    stock?: true
    inStock?: true
    isActive?: true
    sellerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    originalPrice?: true
    image?: true
    category?: true
    subcategory?: true
    stock?: true
    inStock?: true
    isActive?: true
    sellerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    originalPrice?: true
    image?: true
    category?: true
    subcategory?: true
    stock?: true
    inStock?: true
    isActive?: true
    sellerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    name: string
    description: string | null
    price: number
    originalPrice: number | null
    image: string | null
    category: string | null
    subcategory: string | null
    stock: number
    inStock: boolean
    isActive: boolean
    sellerId: number
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    originalPrice?: boolean
    image?: boolean
    category?: boolean
    subcategory?: boolean
    stock?: boolean
    inStock?: boolean
    isActive?: boolean
    sellerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    seller?: boolean | SellerDefaultArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    originalPrice?: boolean
    image?: boolean
    category?: boolean
    subcategory?: boolean
    stock?: boolean
    inStock?: boolean
    isActive?: boolean
    sellerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    originalPrice?: boolean
    image?: boolean
    category?: boolean
    subcategory?: boolean
    stock?: boolean
    inStock?: boolean
    isActive?: boolean
    sellerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    originalPrice?: boolean
    image?: boolean
    category?: boolean
    subcategory?: boolean
    stock?: boolean
    inStock?: boolean
    isActive?: boolean
    sellerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "price" | "originalPrice" | "image" | "category" | "subcategory" | "stock" | "inStock" | "isActive" | "sellerId" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seller?: boolean | SellerDefaultArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      seller: Prisma.$SellerPayload<ExtArgs>
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      price: number
      originalPrice: number | null
      image: string | null
      category: string | null
      subcategory: string | null
      stock: number
      inStock: boolean
      isActive: boolean
      sellerId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    seller<T extends SellerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SellerDefaultArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly originalPrice: FieldRef<"Product", 'Float'>
    readonly image: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'String'>
    readonly subcategory: FieldRef<"Product", 'String'>
    readonly stock: FieldRef<"Product", 'Int'>
    readonly inStock: FieldRef<"Product", 'Boolean'>
    readonly isActive: FieldRef<"Product", 'Boolean'>
    readonly sellerId: FieldRef<"Product", 'Int'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    id: number | null
    customerId: number | null
    deliveryAgentId: number | null
    subtotal: number | null
    deliveryFee: number | null
    taxAmount: number | null
    totalAmount: number | null
  }

  export type OrderSumAggregateOutputType = {
    id: number | null
    customerId: number | null
    deliveryAgentId: number | null
    subtotal: number | null
    deliveryFee: number | null
    taxAmount: number | null
    totalAmount: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: number | null
    orderNumber: string | null
    customerId: number | null
    deliveryAgentId: number | null
    orderStatus: $Enums.OrderStatus | null
    customerName: string | null
    customerPhone: string | null
    customerAddress: string | null
    customerCity: string | null
    customerArea: string | null
    customerLocality: string | null
    subtotal: number | null
    deliveryFee: number | null
    taxAmount: number | null
    totalAmount: number | null
    paymentMethod: $Enums.PaymentMethod | null
    paymentStatus: $Enums.PaymentStatus | null
    deliveryInstructions: string | null
    estimatedDeliveryTime: Date | null
    actualDeliveryTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: number | null
    orderNumber: string | null
    customerId: number | null
    deliveryAgentId: number | null
    orderStatus: $Enums.OrderStatus | null
    customerName: string | null
    customerPhone: string | null
    customerAddress: string | null
    customerCity: string | null
    customerArea: string | null
    customerLocality: string | null
    subtotal: number | null
    deliveryFee: number | null
    taxAmount: number | null
    totalAmount: number | null
    paymentMethod: $Enums.PaymentMethod | null
    paymentStatus: $Enums.PaymentStatus | null
    deliveryInstructions: string | null
    estimatedDeliveryTime: Date | null
    actualDeliveryTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    orderNumber: number
    customerId: number
    deliveryAgentId: number
    orderStatus: number
    customerName: number
    customerPhone: number
    customerAddress: number
    customerCity: number
    customerArea: number
    customerLocality: number
    subtotal: number
    deliveryFee: number
    taxAmount: number
    totalAmount: number
    paymentMethod: number
    paymentStatus: number
    deliveryInstructions: number
    estimatedDeliveryTime: number
    actualDeliveryTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    id?: true
    customerId?: true
    deliveryAgentId?: true
    subtotal?: true
    deliveryFee?: true
    taxAmount?: true
    totalAmount?: true
  }

  export type OrderSumAggregateInputType = {
    id?: true
    customerId?: true
    deliveryAgentId?: true
    subtotal?: true
    deliveryFee?: true
    taxAmount?: true
    totalAmount?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    orderNumber?: true
    customerId?: true
    deliveryAgentId?: true
    orderStatus?: true
    customerName?: true
    customerPhone?: true
    customerAddress?: true
    customerCity?: true
    customerArea?: true
    customerLocality?: true
    subtotal?: true
    deliveryFee?: true
    taxAmount?: true
    totalAmount?: true
    paymentMethod?: true
    paymentStatus?: true
    deliveryInstructions?: true
    estimatedDeliveryTime?: true
    actualDeliveryTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    orderNumber?: true
    customerId?: true
    deliveryAgentId?: true
    orderStatus?: true
    customerName?: true
    customerPhone?: true
    customerAddress?: true
    customerCity?: true
    customerArea?: true
    customerLocality?: true
    subtotal?: true
    deliveryFee?: true
    taxAmount?: true
    totalAmount?: true
    paymentMethod?: true
    paymentStatus?: true
    deliveryInstructions?: true
    estimatedDeliveryTime?: true
    actualDeliveryTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    orderNumber?: true
    customerId?: true
    deliveryAgentId?: true
    orderStatus?: true
    customerName?: true
    customerPhone?: true
    customerAddress?: true
    customerCity?: true
    customerArea?: true
    customerLocality?: true
    subtotal?: true
    deliveryFee?: true
    taxAmount?: true
    totalAmount?: true
    paymentMethod?: true
    paymentStatus?: true
    deliveryInstructions?: true
    estimatedDeliveryTime?: true
    actualDeliveryTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: number
    orderNumber: string
    customerId: number
    deliveryAgentId: number | null
    orderStatus: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality: string | null
    subtotal: number
    deliveryFee: number
    taxAmount: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus: $Enums.PaymentStatus
    deliveryInstructions: string | null
    estimatedDeliveryTime: Date | null
    actualDeliveryTime: Date | null
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    deliveryAgentId?: boolean
    orderStatus?: boolean
    customerName?: boolean
    customerPhone?: boolean
    customerAddress?: boolean
    customerCity?: boolean
    customerArea?: boolean
    customerLocality?: boolean
    subtotal?: boolean
    deliveryFee?: boolean
    taxAmount?: boolean
    totalAmount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    deliveryInstructions?: boolean
    estimatedDeliveryTime?: boolean
    actualDeliveryTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    deliveryAgent?: boolean | Order$deliveryAgentArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    sellerOrders?: boolean | Order$sellerOrdersArgs<ExtArgs>
    payments?: boolean | Order$paymentsArgs<ExtArgs>
    tracking?: boolean | Order$trackingArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    deliveryAgentId?: boolean
    orderStatus?: boolean
    customerName?: boolean
    customerPhone?: boolean
    customerAddress?: boolean
    customerCity?: boolean
    customerArea?: boolean
    customerLocality?: boolean
    subtotal?: boolean
    deliveryFee?: boolean
    taxAmount?: boolean
    totalAmount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    deliveryInstructions?: boolean
    estimatedDeliveryTime?: boolean
    actualDeliveryTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    deliveryAgent?: boolean | Order$deliveryAgentArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    deliveryAgentId?: boolean
    orderStatus?: boolean
    customerName?: boolean
    customerPhone?: boolean
    customerAddress?: boolean
    customerCity?: boolean
    customerArea?: boolean
    customerLocality?: boolean
    subtotal?: boolean
    deliveryFee?: boolean
    taxAmount?: boolean
    totalAmount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    deliveryInstructions?: boolean
    estimatedDeliveryTime?: boolean
    actualDeliveryTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    deliveryAgent?: boolean | Order$deliveryAgentArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    deliveryAgentId?: boolean
    orderStatus?: boolean
    customerName?: boolean
    customerPhone?: boolean
    customerAddress?: boolean
    customerCity?: boolean
    customerArea?: boolean
    customerLocality?: boolean
    subtotal?: boolean
    deliveryFee?: boolean
    taxAmount?: boolean
    totalAmount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    deliveryInstructions?: boolean
    estimatedDeliveryTime?: boolean
    actualDeliveryTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderNumber" | "customerId" | "deliveryAgentId" | "orderStatus" | "customerName" | "customerPhone" | "customerAddress" | "customerCity" | "customerArea" | "customerLocality" | "subtotal" | "deliveryFee" | "taxAmount" | "totalAmount" | "paymentMethod" | "paymentStatus" | "deliveryInstructions" | "estimatedDeliveryTime" | "actualDeliveryTime" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    deliveryAgent?: boolean | Order$deliveryAgentArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    sellerOrders?: boolean | Order$sellerOrdersArgs<ExtArgs>
    payments?: boolean | Order$paymentsArgs<ExtArgs>
    tracking?: boolean | Order$trackingArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    deliveryAgent?: boolean | Order$deliveryAgentArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    deliveryAgent?: boolean | Order$deliveryAgentArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      deliveryAgent: Prisma.$DeliveryAgentPayload<ExtArgs> | null
      items: Prisma.$OrderItemPayload<ExtArgs>[]
      sellerOrders: Prisma.$SellerOrderPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      tracking: Prisma.$OrderTrackingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderNumber: string
      customerId: number
      deliveryAgentId: number | null
      orderStatus: $Enums.OrderStatus
      customerName: string
      customerPhone: string
      customerAddress: string
      customerCity: string
      customerArea: string
      customerLocality: string | null
      subtotal: number
      deliveryFee: number
      taxAmount: number
      totalAmount: number
      paymentMethod: $Enums.PaymentMethod
      paymentStatus: $Enums.PaymentStatus
      deliveryInstructions: string | null
      estimatedDeliveryTime: Date | null
      actualDeliveryTime: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    deliveryAgent<T extends Order$deliveryAgentArgs<ExtArgs> = {}>(args?: Subset<T, Order$deliveryAgentArgs<ExtArgs>>): Prisma__DeliveryAgentClient<$Result.GetResult<Prisma.$DeliveryAgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sellerOrders<T extends Order$sellerOrdersArgs<ExtArgs> = {}>(args?: Subset<T, Order$sellerOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Order$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Order$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tracking<T extends Order$trackingArgs<ExtArgs> = {}>(args?: Subset<T, Order$trackingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderTrackingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'Int'>
    readonly orderNumber: FieldRef<"Order", 'String'>
    readonly customerId: FieldRef<"Order", 'Int'>
    readonly deliveryAgentId: FieldRef<"Order", 'Int'>
    readonly orderStatus: FieldRef<"Order", 'OrderStatus'>
    readonly customerName: FieldRef<"Order", 'String'>
    readonly customerPhone: FieldRef<"Order", 'String'>
    readonly customerAddress: FieldRef<"Order", 'String'>
    readonly customerCity: FieldRef<"Order", 'String'>
    readonly customerArea: FieldRef<"Order", 'String'>
    readonly customerLocality: FieldRef<"Order", 'String'>
    readonly subtotal: FieldRef<"Order", 'Float'>
    readonly deliveryFee: FieldRef<"Order", 'Float'>
    readonly taxAmount: FieldRef<"Order", 'Float'>
    readonly totalAmount: FieldRef<"Order", 'Float'>
    readonly paymentMethod: FieldRef<"Order", 'PaymentMethod'>
    readonly paymentStatus: FieldRef<"Order", 'PaymentStatus'>
    readonly deliveryInstructions: FieldRef<"Order", 'String'>
    readonly estimatedDeliveryTime: FieldRef<"Order", 'DateTime'>
    readonly actualDeliveryTime: FieldRef<"Order", 'DateTime'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.deliveryAgent
   */
  export type Order$deliveryAgentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAgent
     */
    select?: DeliveryAgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAgent
     */
    omit?: DeliveryAgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliveryAgentInclude<ExtArgs> | null
    where?: DeliveryAgentWhereInput
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order.sellerOrders
   */
  export type Order$sellerOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderInclude<ExtArgs> | null
    where?: SellerOrderWhereInput
    orderBy?: SellerOrderOrderByWithRelationInput | SellerOrderOrderByWithRelationInput[]
    cursor?: SellerOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SellerOrderScalarFieldEnum | SellerOrderScalarFieldEnum[]
  }

  /**
   * Order.payments
   */
  export type Order$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Order.tracking
   */
  export type Order$trackingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingInclude<ExtArgs> | null
    where?: OrderTrackingWhereInput
    orderBy?: OrderTrackingOrderByWithRelationInput | OrderTrackingOrderByWithRelationInput[]
    cursor?: OrderTrackingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderTrackingScalarFieldEnum | OrderTrackingScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
    productName: string | null
    productImage: string | null
    productCategory: string | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
    productName: string | null
    productImage: string | null
    productCategory: string | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    quantity: number
    unitPrice: number
    totalPrice: number
    productName: number
    productImage: number
    productCategory: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
  }

  export type OrderItemSumAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
    productName?: true
    productImage?: true
    productCategory?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
    productName?: true
    productImage?: true
    productCategory?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
    productName?: true
    productImage?: true
    productCategory?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: number
    orderId: number
    productId: number
    quantity: number
    unitPrice: number
    totalPrice: number
    productName: string
    productImage: string | null
    productCategory: string | null
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    productName?: boolean
    productImage?: boolean
    productCategory?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    productName?: boolean
    productImage?: boolean
    productCategory?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    productName?: boolean
    productImage?: boolean
    productCategory?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    productName?: boolean
    productImage?: boolean
    productCategory?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "productId" | "quantity" | "unitPrice" | "totalPrice" | "productName" | "productImage" | "productCategory", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderId: number
      productId: number
      quantity: number
      unitPrice: number
      totalPrice: number
      productName: string
      productImage: string | null
      productCategory: string | null
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'Int'>
    readonly orderId: FieldRef<"OrderItem", 'Int'>
    readonly productId: FieldRef<"OrderItem", 'Int'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly unitPrice: FieldRef<"OrderItem", 'Float'>
    readonly totalPrice: FieldRef<"OrderItem", 'Float'>
    readonly productName: FieldRef<"OrderItem", 'String'>
    readonly productImage: FieldRef<"OrderItem", 'String'>
    readonly productCategory: FieldRef<"OrderItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model SellerOrder
   */

  export type AggregateSellerOrder = {
    _count: SellerOrderCountAggregateOutputType | null
    _avg: SellerOrderAvgAggregateOutputType | null
    _sum: SellerOrderSumAggregateOutputType | null
    _min: SellerOrderMinAggregateOutputType | null
    _max: SellerOrderMaxAggregateOutputType | null
  }

  export type SellerOrderAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
    sellerId: number | null
    subtotal: number | null
    commission: number | null
    netAmount: number | null
  }

  export type SellerOrderSumAggregateOutputType = {
    id: number | null
    orderId: number | null
    sellerId: number | null
    subtotal: number | null
    commission: number | null
    netAmount: number | null
  }

  export type SellerOrderMinAggregateOutputType = {
    id: number | null
    orderId: number | null
    sellerId: number | null
    status: $Enums.OrderStatus | null
    subtotal: number | null
    commission: number | null
    netAmount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SellerOrderMaxAggregateOutputType = {
    id: number | null
    orderId: number | null
    sellerId: number | null
    status: $Enums.OrderStatus | null
    subtotal: number | null
    commission: number | null
    netAmount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SellerOrderCountAggregateOutputType = {
    id: number
    orderId: number
    sellerId: number
    status: number
    items: number
    subtotal: number
    commission: number
    netAmount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SellerOrderAvgAggregateInputType = {
    id?: true
    orderId?: true
    sellerId?: true
    subtotal?: true
    commission?: true
    netAmount?: true
  }

  export type SellerOrderSumAggregateInputType = {
    id?: true
    orderId?: true
    sellerId?: true
    subtotal?: true
    commission?: true
    netAmount?: true
  }

  export type SellerOrderMinAggregateInputType = {
    id?: true
    orderId?: true
    sellerId?: true
    status?: true
    subtotal?: true
    commission?: true
    netAmount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SellerOrderMaxAggregateInputType = {
    id?: true
    orderId?: true
    sellerId?: true
    status?: true
    subtotal?: true
    commission?: true
    netAmount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SellerOrderCountAggregateInputType = {
    id?: true
    orderId?: true
    sellerId?: true
    status?: true
    items?: true
    subtotal?: true
    commission?: true
    netAmount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SellerOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SellerOrder to aggregate.
     */
    where?: SellerOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SellerOrders to fetch.
     */
    orderBy?: SellerOrderOrderByWithRelationInput | SellerOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SellerOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SellerOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SellerOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SellerOrders
    **/
    _count?: true | SellerOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SellerOrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SellerOrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SellerOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SellerOrderMaxAggregateInputType
  }

  export type GetSellerOrderAggregateType<T extends SellerOrderAggregateArgs> = {
        [P in keyof T & keyof AggregateSellerOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSellerOrder[P]>
      : GetScalarType<T[P], AggregateSellerOrder[P]>
  }




  export type SellerOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SellerOrderWhereInput
    orderBy?: SellerOrderOrderByWithAggregationInput | SellerOrderOrderByWithAggregationInput[]
    by: SellerOrderScalarFieldEnum[] | SellerOrderScalarFieldEnum
    having?: SellerOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SellerOrderCountAggregateInputType | true
    _avg?: SellerOrderAvgAggregateInputType
    _sum?: SellerOrderSumAggregateInputType
    _min?: SellerOrderMinAggregateInputType
    _max?: SellerOrderMaxAggregateInputType
  }

  export type SellerOrderGroupByOutputType = {
    id: number
    orderId: number
    sellerId: number
    status: $Enums.OrderStatus
    items: JsonValue
    subtotal: number
    commission: number
    netAmount: number
    createdAt: Date
    updatedAt: Date
    _count: SellerOrderCountAggregateOutputType | null
    _avg: SellerOrderAvgAggregateOutputType | null
    _sum: SellerOrderSumAggregateOutputType | null
    _min: SellerOrderMinAggregateOutputType | null
    _max: SellerOrderMaxAggregateOutputType | null
  }

  type GetSellerOrderGroupByPayload<T extends SellerOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SellerOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SellerOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SellerOrderGroupByOutputType[P]>
            : GetScalarType<T[P], SellerOrderGroupByOutputType[P]>
        }
      >
    >


  export type SellerOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    sellerId?: boolean
    status?: boolean
    items?: boolean
    subtotal?: boolean
    commission?: boolean
    netAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sellerOrder"]>

  export type SellerOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    sellerId?: boolean
    status?: boolean
    items?: boolean
    subtotal?: boolean
    commission?: boolean
    netAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sellerOrder"]>

  export type SellerOrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    sellerId?: boolean
    status?: boolean
    items?: boolean
    subtotal?: boolean
    commission?: boolean
    netAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sellerOrder"]>

  export type SellerOrderSelectScalar = {
    id?: boolean
    orderId?: boolean
    sellerId?: boolean
    status?: boolean
    items?: boolean
    subtotal?: boolean
    commission?: boolean
    netAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SellerOrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "sellerId" | "status" | "items" | "subtotal" | "commission" | "netAmount" | "createdAt" | "updatedAt", ExtArgs["result"]["sellerOrder"]>
  export type SellerOrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }
  export type SellerOrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }
  export type SellerOrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    seller?: boolean | SellerDefaultArgs<ExtArgs>
  }

  export type $SellerOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SellerOrder"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      seller: Prisma.$SellerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderId: number
      sellerId: number
      status: $Enums.OrderStatus
      items: Prisma.JsonValue
      subtotal: number
      commission: number
      netAmount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sellerOrder"]>
    composites: {}
  }

  type SellerOrderGetPayload<S extends boolean | null | undefined | SellerOrderDefaultArgs> = $Result.GetResult<Prisma.$SellerOrderPayload, S>

  type SellerOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SellerOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SellerOrderCountAggregateInputType | true
    }

  export interface SellerOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SellerOrder'], meta: { name: 'SellerOrder' } }
    /**
     * Find zero or one SellerOrder that matches the filter.
     * @param {SellerOrderFindUniqueArgs} args - Arguments to find a SellerOrder
     * @example
     * // Get one SellerOrder
     * const sellerOrder = await prisma.sellerOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SellerOrderFindUniqueArgs>(args: SelectSubset<T, SellerOrderFindUniqueArgs<ExtArgs>>): Prisma__SellerOrderClient<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SellerOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SellerOrderFindUniqueOrThrowArgs} args - Arguments to find a SellerOrder
     * @example
     * // Get one SellerOrder
     * const sellerOrder = await prisma.sellerOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SellerOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, SellerOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SellerOrderClient<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SellerOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerOrderFindFirstArgs} args - Arguments to find a SellerOrder
     * @example
     * // Get one SellerOrder
     * const sellerOrder = await prisma.sellerOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SellerOrderFindFirstArgs>(args?: SelectSubset<T, SellerOrderFindFirstArgs<ExtArgs>>): Prisma__SellerOrderClient<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SellerOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerOrderFindFirstOrThrowArgs} args - Arguments to find a SellerOrder
     * @example
     * // Get one SellerOrder
     * const sellerOrder = await prisma.sellerOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SellerOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, SellerOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__SellerOrderClient<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SellerOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SellerOrders
     * const sellerOrders = await prisma.sellerOrder.findMany()
     * 
     * // Get first 10 SellerOrders
     * const sellerOrders = await prisma.sellerOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sellerOrderWithIdOnly = await prisma.sellerOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SellerOrderFindManyArgs>(args?: SelectSubset<T, SellerOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SellerOrder.
     * @param {SellerOrderCreateArgs} args - Arguments to create a SellerOrder.
     * @example
     * // Create one SellerOrder
     * const SellerOrder = await prisma.sellerOrder.create({
     *   data: {
     *     // ... data to create a SellerOrder
     *   }
     * })
     * 
     */
    create<T extends SellerOrderCreateArgs>(args: SelectSubset<T, SellerOrderCreateArgs<ExtArgs>>): Prisma__SellerOrderClient<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SellerOrders.
     * @param {SellerOrderCreateManyArgs} args - Arguments to create many SellerOrders.
     * @example
     * // Create many SellerOrders
     * const sellerOrder = await prisma.sellerOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SellerOrderCreateManyArgs>(args?: SelectSubset<T, SellerOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SellerOrders and returns the data saved in the database.
     * @param {SellerOrderCreateManyAndReturnArgs} args - Arguments to create many SellerOrders.
     * @example
     * // Create many SellerOrders
     * const sellerOrder = await prisma.sellerOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SellerOrders and only return the `id`
     * const sellerOrderWithIdOnly = await prisma.sellerOrder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SellerOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, SellerOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SellerOrder.
     * @param {SellerOrderDeleteArgs} args - Arguments to delete one SellerOrder.
     * @example
     * // Delete one SellerOrder
     * const SellerOrder = await prisma.sellerOrder.delete({
     *   where: {
     *     // ... filter to delete one SellerOrder
     *   }
     * })
     * 
     */
    delete<T extends SellerOrderDeleteArgs>(args: SelectSubset<T, SellerOrderDeleteArgs<ExtArgs>>): Prisma__SellerOrderClient<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SellerOrder.
     * @param {SellerOrderUpdateArgs} args - Arguments to update one SellerOrder.
     * @example
     * // Update one SellerOrder
     * const sellerOrder = await prisma.sellerOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SellerOrderUpdateArgs>(args: SelectSubset<T, SellerOrderUpdateArgs<ExtArgs>>): Prisma__SellerOrderClient<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SellerOrders.
     * @param {SellerOrderDeleteManyArgs} args - Arguments to filter SellerOrders to delete.
     * @example
     * // Delete a few SellerOrders
     * const { count } = await prisma.sellerOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SellerOrderDeleteManyArgs>(args?: SelectSubset<T, SellerOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SellerOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SellerOrders
     * const sellerOrder = await prisma.sellerOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SellerOrderUpdateManyArgs>(args: SelectSubset<T, SellerOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SellerOrders and returns the data updated in the database.
     * @param {SellerOrderUpdateManyAndReturnArgs} args - Arguments to update many SellerOrders.
     * @example
     * // Update many SellerOrders
     * const sellerOrder = await prisma.sellerOrder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SellerOrders and only return the `id`
     * const sellerOrderWithIdOnly = await prisma.sellerOrder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SellerOrderUpdateManyAndReturnArgs>(args: SelectSubset<T, SellerOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SellerOrder.
     * @param {SellerOrderUpsertArgs} args - Arguments to update or create a SellerOrder.
     * @example
     * // Update or create a SellerOrder
     * const sellerOrder = await prisma.sellerOrder.upsert({
     *   create: {
     *     // ... data to create a SellerOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SellerOrder we want to update
     *   }
     * })
     */
    upsert<T extends SellerOrderUpsertArgs>(args: SelectSubset<T, SellerOrderUpsertArgs<ExtArgs>>): Prisma__SellerOrderClient<$Result.GetResult<Prisma.$SellerOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SellerOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerOrderCountArgs} args - Arguments to filter SellerOrders to count.
     * @example
     * // Count the number of SellerOrders
     * const count = await prisma.sellerOrder.count({
     *   where: {
     *     // ... the filter for the SellerOrders we want to count
     *   }
     * })
    **/
    count<T extends SellerOrderCountArgs>(
      args?: Subset<T, SellerOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SellerOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SellerOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SellerOrderAggregateArgs>(args: Subset<T, SellerOrderAggregateArgs>): Prisma.PrismaPromise<GetSellerOrderAggregateType<T>>

    /**
     * Group by SellerOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SellerOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SellerOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SellerOrderGroupByArgs['orderBy'] }
        : { orderBy?: SellerOrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SellerOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSellerOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SellerOrder model
   */
  readonly fields: SellerOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SellerOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SellerOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    seller<T extends SellerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SellerDefaultArgs<ExtArgs>>): Prisma__SellerClient<$Result.GetResult<Prisma.$SellerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SellerOrder model
   */
  interface SellerOrderFieldRefs {
    readonly id: FieldRef<"SellerOrder", 'Int'>
    readonly orderId: FieldRef<"SellerOrder", 'Int'>
    readonly sellerId: FieldRef<"SellerOrder", 'Int'>
    readonly status: FieldRef<"SellerOrder", 'OrderStatus'>
    readonly items: FieldRef<"SellerOrder", 'Json'>
    readonly subtotal: FieldRef<"SellerOrder", 'Float'>
    readonly commission: FieldRef<"SellerOrder", 'Float'>
    readonly netAmount: FieldRef<"SellerOrder", 'Float'>
    readonly createdAt: FieldRef<"SellerOrder", 'DateTime'>
    readonly updatedAt: FieldRef<"SellerOrder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SellerOrder findUnique
   */
  export type SellerOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderInclude<ExtArgs> | null
    /**
     * Filter, which SellerOrder to fetch.
     */
    where: SellerOrderWhereUniqueInput
  }

  /**
   * SellerOrder findUniqueOrThrow
   */
  export type SellerOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderInclude<ExtArgs> | null
    /**
     * Filter, which SellerOrder to fetch.
     */
    where: SellerOrderWhereUniqueInput
  }

  /**
   * SellerOrder findFirst
   */
  export type SellerOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderInclude<ExtArgs> | null
    /**
     * Filter, which SellerOrder to fetch.
     */
    where?: SellerOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SellerOrders to fetch.
     */
    orderBy?: SellerOrderOrderByWithRelationInput | SellerOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SellerOrders.
     */
    cursor?: SellerOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SellerOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SellerOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SellerOrders.
     */
    distinct?: SellerOrderScalarFieldEnum | SellerOrderScalarFieldEnum[]
  }

  /**
   * SellerOrder findFirstOrThrow
   */
  export type SellerOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderInclude<ExtArgs> | null
    /**
     * Filter, which SellerOrder to fetch.
     */
    where?: SellerOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SellerOrders to fetch.
     */
    orderBy?: SellerOrderOrderByWithRelationInput | SellerOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SellerOrders.
     */
    cursor?: SellerOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SellerOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SellerOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SellerOrders.
     */
    distinct?: SellerOrderScalarFieldEnum | SellerOrderScalarFieldEnum[]
  }

  /**
   * SellerOrder findMany
   */
  export type SellerOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderInclude<ExtArgs> | null
    /**
     * Filter, which SellerOrders to fetch.
     */
    where?: SellerOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SellerOrders to fetch.
     */
    orderBy?: SellerOrderOrderByWithRelationInput | SellerOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SellerOrders.
     */
    cursor?: SellerOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SellerOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SellerOrders.
     */
    skip?: number
    distinct?: SellerOrderScalarFieldEnum | SellerOrderScalarFieldEnum[]
  }

  /**
   * SellerOrder create
   */
  export type SellerOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderInclude<ExtArgs> | null
    /**
     * The data needed to create a SellerOrder.
     */
    data: XOR<SellerOrderCreateInput, SellerOrderUncheckedCreateInput>
  }

  /**
   * SellerOrder createMany
   */
  export type SellerOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SellerOrders.
     */
    data: SellerOrderCreateManyInput | SellerOrderCreateManyInput[]
  }

  /**
   * SellerOrder createManyAndReturn
   */
  export type SellerOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * The data used to create many SellerOrders.
     */
    data: SellerOrderCreateManyInput | SellerOrderCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SellerOrder update
   */
  export type SellerOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderInclude<ExtArgs> | null
    /**
     * The data needed to update a SellerOrder.
     */
    data: XOR<SellerOrderUpdateInput, SellerOrderUncheckedUpdateInput>
    /**
     * Choose, which SellerOrder to update.
     */
    where: SellerOrderWhereUniqueInput
  }

  /**
   * SellerOrder updateMany
   */
  export type SellerOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SellerOrders.
     */
    data: XOR<SellerOrderUpdateManyMutationInput, SellerOrderUncheckedUpdateManyInput>
    /**
     * Filter which SellerOrders to update
     */
    where?: SellerOrderWhereInput
    /**
     * Limit how many SellerOrders to update.
     */
    limit?: number
  }

  /**
   * SellerOrder updateManyAndReturn
   */
  export type SellerOrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * The data used to update SellerOrders.
     */
    data: XOR<SellerOrderUpdateManyMutationInput, SellerOrderUncheckedUpdateManyInput>
    /**
     * Filter which SellerOrders to update
     */
    where?: SellerOrderWhereInput
    /**
     * Limit how many SellerOrders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SellerOrder upsert
   */
  export type SellerOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderInclude<ExtArgs> | null
    /**
     * The filter to search for the SellerOrder to update in case it exists.
     */
    where: SellerOrderWhereUniqueInput
    /**
     * In case the SellerOrder found by the `where` argument doesn't exist, create a new SellerOrder with this data.
     */
    create: XOR<SellerOrderCreateInput, SellerOrderUncheckedCreateInput>
    /**
     * In case the SellerOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SellerOrderUpdateInput, SellerOrderUncheckedUpdateInput>
  }

  /**
   * SellerOrder delete
   */
  export type SellerOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderInclude<ExtArgs> | null
    /**
     * Filter which SellerOrder to delete.
     */
    where: SellerOrderWhereUniqueInput
  }

  /**
   * SellerOrder deleteMany
   */
  export type SellerOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SellerOrders to delete
     */
    where?: SellerOrderWhereInput
    /**
     * Limit how many SellerOrders to delete.
     */
    limit?: number
  }

  /**
   * SellerOrder without action
   */
  export type SellerOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SellerOrder
     */
    select?: SellerOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SellerOrder
     */
    omit?: SellerOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SellerOrderInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
    customerId: number | null
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    id: number | null
    orderId: number | null
    customerId: number | null
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: number | null
    paymentId: string | null
    orderId: number | null
    customerId: number | null
    amount: number | null
    paymentMethod: $Enums.PaymentMethod | null
    paymentStatus: $Enums.PaymentStatus | null
    transactionId: string | null
    gateway: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: number | null
    paymentId: string | null
    orderId: number | null
    customerId: number | null
    amount: number | null
    paymentMethod: $Enums.PaymentMethod | null
    paymentStatus: $Enums.PaymentStatus | null
    transactionId: string | null
    gateway: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    paymentId: number
    orderId: number
    customerId: number
    amount: number
    paymentMethod: number
    paymentStatus: number
    transactionId: number
    gateway: number
    gatewayResponse: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    id?: true
    orderId?: true
    customerId?: true
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    id?: true
    orderId?: true
    customerId?: true
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    paymentId?: true
    orderId?: true
    customerId?: true
    amount?: true
    paymentMethod?: true
    paymentStatus?: true
    transactionId?: true
    gateway?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    paymentId?: true
    orderId?: true
    customerId?: true
    amount?: true
    paymentMethod?: true
    paymentStatus?: true
    transactionId?: true
    gateway?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    paymentId?: true
    orderId?: true
    customerId?: true
    amount?: true
    paymentMethod?: true
    paymentStatus?: true
    transactionId?: true
    gateway?: true
    gatewayResponse?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: number
    paymentId: string
    orderId: number
    customerId: number
    amount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus: $Enums.PaymentStatus
    transactionId: string | null
    gateway: string | null
    gatewayResponse: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    orderId?: boolean
    customerId?: boolean
    amount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    transactionId?: boolean
    gateway?: boolean
    gatewayResponse?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    orderId?: boolean
    customerId?: boolean
    amount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    transactionId?: boolean
    gateway?: boolean
    gatewayResponse?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    orderId?: boolean
    customerId?: boolean
    amount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    transactionId?: boolean
    gateway?: boolean
    gatewayResponse?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    paymentId?: boolean
    orderId?: boolean
    customerId?: boolean
    amount?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    transactionId?: boolean
    gateway?: boolean
    gatewayResponse?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "paymentId" | "orderId" | "customerId" | "amount" | "paymentMethod" | "paymentStatus" | "transactionId" | "gateway" | "gatewayResponse" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      customer: Prisma.$CustomerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      paymentId: string
      orderId: number
      customerId: number
      amount: number
      paymentMethod: $Enums.PaymentMethod
      paymentStatus: $Enums.PaymentStatus
      transactionId: string | null
      gateway: string | null
      gatewayResponse: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'Int'>
    readonly paymentId: FieldRef<"Payment", 'String'>
    readonly orderId: FieldRef<"Payment", 'Int'>
    readonly customerId: FieldRef<"Payment", 'Int'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly paymentMethod: FieldRef<"Payment", 'PaymentMethod'>
    readonly paymentStatus: FieldRef<"Payment", 'PaymentStatus'>
    readonly transactionId: FieldRef<"Payment", 'String'>
    readonly gateway: FieldRef<"Payment", 'String'>
    readonly gatewayResponse: FieldRef<"Payment", 'Json'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model OrderTracking
   */

  export type AggregateOrderTracking = {
    _count: OrderTrackingCountAggregateOutputType | null
    _avg: OrderTrackingAvgAggregateOutputType | null
    _sum: OrderTrackingSumAggregateOutputType | null
    _min: OrderTrackingMinAggregateOutputType | null
    _max: OrderTrackingMaxAggregateOutputType | null
  }

  export type OrderTrackingAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
  }

  export type OrderTrackingSumAggregateOutputType = {
    id: number | null
    orderId: number | null
  }

  export type OrderTrackingMinAggregateOutputType = {
    id: number | null
    orderId: number | null
    status: $Enums.TrackingStatus | null
    description: string | null
    location: string | null
    createdAt: Date | null
  }

  export type OrderTrackingMaxAggregateOutputType = {
    id: number | null
    orderId: number | null
    status: $Enums.TrackingStatus | null
    description: string | null
    location: string | null
    createdAt: Date | null
  }

  export type OrderTrackingCountAggregateOutputType = {
    id: number
    orderId: number
    status: number
    description: number
    location: number
    createdAt: number
    _all: number
  }


  export type OrderTrackingAvgAggregateInputType = {
    id?: true
    orderId?: true
  }

  export type OrderTrackingSumAggregateInputType = {
    id?: true
    orderId?: true
  }

  export type OrderTrackingMinAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    description?: true
    location?: true
    createdAt?: true
  }

  export type OrderTrackingMaxAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    description?: true
    location?: true
    createdAt?: true
  }

  export type OrderTrackingCountAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    description?: true
    location?: true
    createdAt?: true
    _all?: true
  }

  export type OrderTrackingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderTracking to aggregate.
     */
    where?: OrderTrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderTrackings to fetch.
     */
    orderBy?: OrderTrackingOrderByWithRelationInput | OrderTrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderTrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderTrackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderTrackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderTrackings
    **/
    _count?: true | OrderTrackingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderTrackingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderTrackingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderTrackingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderTrackingMaxAggregateInputType
  }

  export type GetOrderTrackingAggregateType<T extends OrderTrackingAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderTracking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderTracking[P]>
      : GetScalarType<T[P], AggregateOrderTracking[P]>
  }




  export type OrderTrackingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderTrackingWhereInput
    orderBy?: OrderTrackingOrderByWithAggregationInput | OrderTrackingOrderByWithAggregationInput[]
    by: OrderTrackingScalarFieldEnum[] | OrderTrackingScalarFieldEnum
    having?: OrderTrackingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderTrackingCountAggregateInputType | true
    _avg?: OrderTrackingAvgAggregateInputType
    _sum?: OrderTrackingSumAggregateInputType
    _min?: OrderTrackingMinAggregateInputType
    _max?: OrderTrackingMaxAggregateInputType
  }

  export type OrderTrackingGroupByOutputType = {
    id: number
    orderId: number
    status: $Enums.TrackingStatus
    description: string
    location: string | null
    createdAt: Date
    _count: OrderTrackingCountAggregateOutputType | null
    _avg: OrderTrackingAvgAggregateOutputType | null
    _sum: OrderTrackingSumAggregateOutputType | null
    _min: OrderTrackingMinAggregateOutputType | null
    _max: OrderTrackingMaxAggregateOutputType | null
  }

  type GetOrderTrackingGroupByPayload<T extends OrderTrackingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderTrackingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderTrackingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderTrackingGroupByOutputType[P]>
            : GetScalarType<T[P], OrderTrackingGroupByOutputType[P]>
        }
      >
    >


  export type OrderTrackingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    description?: boolean
    location?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderTracking"]>

  export type OrderTrackingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    description?: boolean
    location?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderTracking"]>

  export type OrderTrackingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    description?: boolean
    location?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderTracking"]>

  export type OrderTrackingSelectScalar = {
    id?: boolean
    orderId?: boolean
    status?: boolean
    description?: boolean
    location?: boolean
    createdAt?: boolean
  }

  export type OrderTrackingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "status" | "description" | "location" | "createdAt", ExtArgs["result"]["orderTracking"]>
  export type OrderTrackingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderTrackingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderTrackingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderTrackingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderTracking"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderId: number
      status: $Enums.TrackingStatus
      description: string
      location: string | null
      createdAt: Date
    }, ExtArgs["result"]["orderTracking"]>
    composites: {}
  }

  type OrderTrackingGetPayload<S extends boolean | null | undefined | OrderTrackingDefaultArgs> = $Result.GetResult<Prisma.$OrderTrackingPayload, S>

  type OrderTrackingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderTrackingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderTrackingCountAggregateInputType | true
    }

  export interface OrderTrackingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderTracking'], meta: { name: 'OrderTracking' } }
    /**
     * Find zero or one OrderTracking that matches the filter.
     * @param {OrderTrackingFindUniqueArgs} args - Arguments to find a OrderTracking
     * @example
     * // Get one OrderTracking
     * const orderTracking = await prisma.orderTracking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderTrackingFindUniqueArgs>(args: SelectSubset<T, OrderTrackingFindUniqueArgs<ExtArgs>>): Prisma__OrderTrackingClient<$Result.GetResult<Prisma.$OrderTrackingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderTracking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderTrackingFindUniqueOrThrowArgs} args - Arguments to find a OrderTracking
     * @example
     * // Get one OrderTracking
     * const orderTracking = await prisma.orderTracking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderTrackingFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderTrackingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderTrackingClient<$Result.GetResult<Prisma.$OrderTrackingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderTracking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderTrackingFindFirstArgs} args - Arguments to find a OrderTracking
     * @example
     * // Get one OrderTracking
     * const orderTracking = await prisma.orderTracking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderTrackingFindFirstArgs>(args?: SelectSubset<T, OrderTrackingFindFirstArgs<ExtArgs>>): Prisma__OrderTrackingClient<$Result.GetResult<Prisma.$OrderTrackingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderTracking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderTrackingFindFirstOrThrowArgs} args - Arguments to find a OrderTracking
     * @example
     * // Get one OrderTracking
     * const orderTracking = await prisma.orderTracking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderTrackingFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderTrackingFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderTrackingClient<$Result.GetResult<Prisma.$OrderTrackingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderTrackings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderTrackingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderTrackings
     * const orderTrackings = await prisma.orderTracking.findMany()
     * 
     * // Get first 10 OrderTrackings
     * const orderTrackings = await prisma.orderTracking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderTrackingWithIdOnly = await prisma.orderTracking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderTrackingFindManyArgs>(args?: SelectSubset<T, OrderTrackingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderTrackingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderTracking.
     * @param {OrderTrackingCreateArgs} args - Arguments to create a OrderTracking.
     * @example
     * // Create one OrderTracking
     * const OrderTracking = await prisma.orderTracking.create({
     *   data: {
     *     // ... data to create a OrderTracking
     *   }
     * })
     * 
     */
    create<T extends OrderTrackingCreateArgs>(args: SelectSubset<T, OrderTrackingCreateArgs<ExtArgs>>): Prisma__OrderTrackingClient<$Result.GetResult<Prisma.$OrderTrackingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderTrackings.
     * @param {OrderTrackingCreateManyArgs} args - Arguments to create many OrderTrackings.
     * @example
     * // Create many OrderTrackings
     * const orderTracking = await prisma.orderTracking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderTrackingCreateManyArgs>(args?: SelectSubset<T, OrderTrackingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderTrackings and returns the data saved in the database.
     * @param {OrderTrackingCreateManyAndReturnArgs} args - Arguments to create many OrderTrackings.
     * @example
     * // Create many OrderTrackings
     * const orderTracking = await prisma.orderTracking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderTrackings and only return the `id`
     * const orderTrackingWithIdOnly = await prisma.orderTracking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderTrackingCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderTrackingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderTrackingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderTracking.
     * @param {OrderTrackingDeleteArgs} args - Arguments to delete one OrderTracking.
     * @example
     * // Delete one OrderTracking
     * const OrderTracking = await prisma.orderTracking.delete({
     *   where: {
     *     // ... filter to delete one OrderTracking
     *   }
     * })
     * 
     */
    delete<T extends OrderTrackingDeleteArgs>(args: SelectSubset<T, OrderTrackingDeleteArgs<ExtArgs>>): Prisma__OrderTrackingClient<$Result.GetResult<Prisma.$OrderTrackingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderTracking.
     * @param {OrderTrackingUpdateArgs} args - Arguments to update one OrderTracking.
     * @example
     * // Update one OrderTracking
     * const orderTracking = await prisma.orderTracking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderTrackingUpdateArgs>(args: SelectSubset<T, OrderTrackingUpdateArgs<ExtArgs>>): Prisma__OrderTrackingClient<$Result.GetResult<Prisma.$OrderTrackingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderTrackings.
     * @param {OrderTrackingDeleteManyArgs} args - Arguments to filter OrderTrackings to delete.
     * @example
     * // Delete a few OrderTrackings
     * const { count } = await prisma.orderTracking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderTrackingDeleteManyArgs>(args?: SelectSubset<T, OrderTrackingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderTrackings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderTrackingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderTrackings
     * const orderTracking = await prisma.orderTracking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderTrackingUpdateManyArgs>(args: SelectSubset<T, OrderTrackingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderTrackings and returns the data updated in the database.
     * @param {OrderTrackingUpdateManyAndReturnArgs} args - Arguments to update many OrderTrackings.
     * @example
     * // Update many OrderTrackings
     * const orderTracking = await prisma.orderTracking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderTrackings and only return the `id`
     * const orderTrackingWithIdOnly = await prisma.orderTracking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderTrackingUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderTrackingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderTrackingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderTracking.
     * @param {OrderTrackingUpsertArgs} args - Arguments to update or create a OrderTracking.
     * @example
     * // Update or create a OrderTracking
     * const orderTracking = await prisma.orderTracking.upsert({
     *   create: {
     *     // ... data to create a OrderTracking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderTracking we want to update
     *   }
     * })
     */
    upsert<T extends OrderTrackingUpsertArgs>(args: SelectSubset<T, OrderTrackingUpsertArgs<ExtArgs>>): Prisma__OrderTrackingClient<$Result.GetResult<Prisma.$OrderTrackingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderTrackings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderTrackingCountArgs} args - Arguments to filter OrderTrackings to count.
     * @example
     * // Count the number of OrderTrackings
     * const count = await prisma.orderTracking.count({
     *   where: {
     *     // ... the filter for the OrderTrackings we want to count
     *   }
     * })
    **/
    count<T extends OrderTrackingCountArgs>(
      args?: Subset<T, OrderTrackingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderTrackingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderTracking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderTrackingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderTrackingAggregateArgs>(args: Subset<T, OrderTrackingAggregateArgs>): Prisma.PrismaPromise<GetOrderTrackingAggregateType<T>>

    /**
     * Group by OrderTracking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderTrackingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderTrackingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderTrackingGroupByArgs['orderBy'] }
        : { orderBy?: OrderTrackingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderTrackingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderTrackingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderTracking model
   */
  readonly fields: OrderTrackingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderTracking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderTrackingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderTracking model
   */
  interface OrderTrackingFieldRefs {
    readonly id: FieldRef<"OrderTracking", 'Int'>
    readonly orderId: FieldRef<"OrderTracking", 'Int'>
    readonly status: FieldRef<"OrderTracking", 'TrackingStatus'>
    readonly description: FieldRef<"OrderTracking", 'String'>
    readonly location: FieldRef<"OrderTracking", 'String'>
    readonly createdAt: FieldRef<"OrderTracking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderTracking findUnique
   */
  export type OrderTrackingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingInclude<ExtArgs> | null
    /**
     * Filter, which OrderTracking to fetch.
     */
    where: OrderTrackingWhereUniqueInput
  }

  /**
   * OrderTracking findUniqueOrThrow
   */
  export type OrderTrackingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingInclude<ExtArgs> | null
    /**
     * Filter, which OrderTracking to fetch.
     */
    where: OrderTrackingWhereUniqueInput
  }

  /**
   * OrderTracking findFirst
   */
  export type OrderTrackingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingInclude<ExtArgs> | null
    /**
     * Filter, which OrderTracking to fetch.
     */
    where?: OrderTrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderTrackings to fetch.
     */
    orderBy?: OrderTrackingOrderByWithRelationInput | OrderTrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderTrackings.
     */
    cursor?: OrderTrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderTrackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderTrackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderTrackings.
     */
    distinct?: OrderTrackingScalarFieldEnum | OrderTrackingScalarFieldEnum[]
  }

  /**
   * OrderTracking findFirstOrThrow
   */
  export type OrderTrackingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingInclude<ExtArgs> | null
    /**
     * Filter, which OrderTracking to fetch.
     */
    where?: OrderTrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderTrackings to fetch.
     */
    orderBy?: OrderTrackingOrderByWithRelationInput | OrderTrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderTrackings.
     */
    cursor?: OrderTrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderTrackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderTrackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderTrackings.
     */
    distinct?: OrderTrackingScalarFieldEnum | OrderTrackingScalarFieldEnum[]
  }

  /**
   * OrderTracking findMany
   */
  export type OrderTrackingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingInclude<ExtArgs> | null
    /**
     * Filter, which OrderTrackings to fetch.
     */
    where?: OrderTrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderTrackings to fetch.
     */
    orderBy?: OrderTrackingOrderByWithRelationInput | OrderTrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderTrackings.
     */
    cursor?: OrderTrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderTrackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderTrackings.
     */
    skip?: number
    distinct?: OrderTrackingScalarFieldEnum | OrderTrackingScalarFieldEnum[]
  }

  /**
   * OrderTracking create
   */
  export type OrderTrackingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderTracking.
     */
    data: XOR<OrderTrackingCreateInput, OrderTrackingUncheckedCreateInput>
  }

  /**
   * OrderTracking createMany
   */
  export type OrderTrackingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderTrackings.
     */
    data: OrderTrackingCreateManyInput | OrderTrackingCreateManyInput[]
  }

  /**
   * OrderTracking createManyAndReturn
   */
  export type OrderTrackingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * The data used to create many OrderTrackings.
     */
    data: OrderTrackingCreateManyInput | OrderTrackingCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderTracking update
   */
  export type OrderTrackingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderTracking.
     */
    data: XOR<OrderTrackingUpdateInput, OrderTrackingUncheckedUpdateInput>
    /**
     * Choose, which OrderTracking to update.
     */
    where: OrderTrackingWhereUniqueInput
  }

  /**
   * OrderTracking updateMany
   */
  export type OrderTrackingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderTrackings.
     */
    data: XOR<OrderTrackingUpdateManyMutationInput, OrderTrackingUncheckedUpdateManyInput>
    /**
     * Filter which OrderTrackings to update
     */
    where?: OrderTrackingWhereInput
    /**
     * Limit how many OrderTrackings to update.
     */
    limit?: number
  }

  /**
   * OrderTracking updateManyAndReturn
   */
  export type OrderTrackingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * The data used to update OrderTrackings.
     */
    data: XOR<OrderTrackingUpdateManyMutationInput, OrderTrackingUncheckedUpdateManyInput>
    /**
     * Filter which OrderTrackings to update
     */
    where?: OrderTrackingWhereInput
    /**
     * Limit how many OrderTrackings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderTracking upsert
   */
  export type OrderTrackingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderTracking to update in case it exists.
     */
    where: OrderTrackingWhereUniqueInput
    /**
     * In case the OrderTracking found by the `where` argument doesn't exist, create a new OrderTracking with this data.
     */
    create: XOR<OrderTrackingCreateInput, OrderTrackingUncheckedCreateInput>
    /**
     * In case the OrderTracking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderTrackingUpdateInput, OrderTrackingUncheckedUpdateInput>
  }

  /**
   * OrderTracking delete
   */
  export type OrderTrackingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingInclude<ExtArgs> | null
    /**
     * Filter which OrderTracking to delete.
     */
    where: OrderTrackingWhereUniqueInput
  }

  /**
   * OrderTracking deleteMany
   */
  export type OrderTrackingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderTrackings to delete
     */
    where?: OrderTrackingWhereInput
    /**
     * Limit how many OrderTrackings to delete.
     */
    limit?: number
  }

  /**
   * OrderTracking without action
   */
  export type OrderTrackingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderTracking
     */
    select?: OrderTrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderTracking
     */
    omit?: OrderTrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderTrackingInclude<ExtArgs> | null
  }


  /**
   * Model ChatMessage
   */

  export type AggregateChatMessage = {
    _count: ChatMessageCountAggregateOutputType | null
    _avg: ChatMessageAvgAggregateOutputType | null
    _sum: ChatMessageSumAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  export type ChatMessageAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
  }

  export type ChatMessageSumAggregateOutputType = {
    id: number | null
    orderId: number | null
  }

  export type ChatMessageMinAggregateOutputType = {
    id: number | null
    senderId: string | null
    senderType: string | null
    receiverId: string | null
    receiverType: string | null
    message: string | null
    orderId: number | null
    isRead: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatMessageMaxAggregateOutputType = {
    id: number | null
    senderId: string | null
    senderType: string | null
    receiverId: string | null
    receiverType: string | null
    message: string | null
    orderId: number | null
    isRead: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatMessageCountAggregateOutputType = {
    id: number
    senderId: number
    senderType: number
    receiverId: number
    receiverType: number
    message: number
    orderId: number
    isRead: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChatMessageAvgAggregateInputType = {
    id?: true
    orderId?: true
  }

  export type ChatMessageSumAggregateInputType = {
    id?: true
    orderId?: true
  }

  export type ChatMessageMinAggregateInputType = {
    id?: true
    senderId?: true
    senderType?: true
    receiverId?: true
    receiverType?: true
    message?: true
    orderId?: true
    isRead?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatMessageMaxAggregateInputType = {
    id?: true
    senderId?: true
    senderType?: true
    receiverId?: true
    receiverType?: true
    message?: true
    orderId?: true
    isRead?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatMessageCountAggregateInputType = {
    id?: true
    senderId?: true
    senderType?: true
    receiverId?: true
    receiverType?: true
    message?: true
    orderId?: true
    isRead?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessage to aggregate.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMessages
    **/
    _count?: true | ChatMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatMessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatMessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMessageMaxAggregateInputType
  }

  export type GetChatMessageAggregateType<T extends ChatMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMessage[P]>
      : GetScalarType<T[P], AggregateChatMessage[P]>
  }




  export type ChatMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithAggregationInput | ChatMessageOrderByWithAggregationInput[]
    by: ChatMessageScalarFieldEnum[] | ChatMessageScalarFieldEnum
    having?: ChatMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMessageCountAggregateInputType | true
    _avg?: ChatMessageAvgAggregateInputType
    _sum?: ChatMessageSumAggregateInputType
    _min?: ChatMessageMinAggregateInputType
    _max?: ChatMessageMaxAggregateInputType
  }

  export type ChatMessageGroupByOutputType = {
    id: number
    senderId: string
    senderType: string
    receiverId: string
    receiverType: string
    message: string
    orderId: number | null
    isRead: boolean
    createdAt: Date
    updatedAt: Date
    _count: ChatMessageCountAggregateOutputType | null
    _avg: ChatMessageAvgAggregateOutputType | null
    _sum: ChatMessageSumAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  type GetChatMessageGroupByPayload<T extends ChatMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
        }
      >
    >


  export type ChatMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    senderType?: boolean
    receiverId?: boolean
    receiverType?: boolean
    message?: boolean
    orderId?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    senderType?: boolean
    receiverId?: boolean
    receiverType?: boolean
    message?: boolean
    orderId?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    senderType?: boolean
    receiverId?: boolean
    receiverType?: boolean
    message?: boolean
    orderId?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectScalar = {
    id?: boolean
    senderId?: boolean
    senderType?: boolean
    receiverId?: boolean
    receiverType?: boolean
    message?: boolean
    orderId?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChatMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "senderId" | "senderType" | "receiverId" | "receiverType" | "message" | "orderId" | "isRead" | "createdAt" | "updatedAt", ExtArgs["result"]["chatMessage"]>

  export type $ChatMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      senderId: string
      senderType: string
      receiverId: string
      receiverType: string
      message: string
      orderId: number | null
      isRead: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chatMessage"]>
    composites: {}
  }

  type ChatMessageGetPayload<S extends boolean | null | undefined | ChatMessageDefaultArgs> = $Result.GetResult<Prisma.$ChatMessagePayload, S>

  type ChatMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatMessageCountAggregateInputType | true
    }

  export interface ChatMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMessage'], meta: { name: 'ChatMessage' } }
    /**
     * Find zero or one ChatMessage that matches the filter.
     * @param {ChatMessageFindUniqueArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatMessageFindUniqueArgs>(args: SelectSubset<T, ChatMessageFindUniqueArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatMessageFindUniqueOrThrowArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatMessageFindFirstArgs>(args?: SelectSubset<T, ChatMessageFindFirstArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstOrThrowArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany()
     * 
     * // Get first 10 ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatMessageFindManyArgs>(args?: SelectSubset<T, ChatMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatMessage.
     * @param {ChatMessageCreateArgs} args - Arguments to create a ChatMessage.
     * @example
     * // Create one ChatMessage
     * const ChatMessage = await prisma.chatMessage.create({
     *   data: {
     *     // ... data to create a ChatMessage
     *   }
     * })
     * 
     */
    create<T extends ChatMessageCreateArgs>(args: SelectSubset<T, ChatMessageCreateArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatMessages.
     * @param {ChatMessageCreateManyArgs} args - Arguments to create many ChatMessages.
     * @example
     * // Create many ChatMessages
     * const chatMessage = await prisma.chatMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatMessageCreateManyArgs>(args?: SelectSubset<T, ChatMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatMessages and returns the data saved in the database.
     * @param {ChatMessageCreateManyAndReturnArgs} args - Arguments to create many ChatMessages.
     * @example
     * // Create many ChatMessages
     * const chatMessage = await prisma.chatMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatMessages and only return the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatMessage.
     * @param {ChatMessageDeleteArgs} args - Arguments to delete one ChatMessage.
     * @example
     * // Delete one ChatMessage
     * const ChatMessage = await prisma.chatMessage.delete({
     *   where: {
     *     // ... filter to delete one ChatMessage
     *   }
     * })
     * 
     */
    delete<T extends ChatMessageDeleteArgs>(args: SelectSubset<T, ChatMessageDeleteArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatMessage.
     * @param {ChatMessageUpdateArgs} args - Arguments to update one ChatMessage.
     * @example
     * // Update one ChatMessage
     * const chatMessage = await prisma.chatMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatMessageUpdateArgs>(args: SelectSubset<T, ChatMessageUpdateArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatMessages.
     * @param {ChatMessageDeleteManyArgs} args - Arguments to filter ChatMessages to delete.
     * @example
     * // Delete a few ChatMessages
     * const { count } = await prisma.chatMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatMessageDeleteManyArgs>(args?: SelectSubset<T, ChatMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMessages
     * const chatMessage = await prisma.chatMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatMessageUpdateManyArgs>(args: SelectSubset<T, ChatMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessages and returns the data updated in the database.
     * @param {ChatMessageUpdateManyAndReturnArgs} args - Arguments to update many ChatMessages.
     * @example
     * // Update many ChatMessages
     * const chatMessage = await prisma.chatMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatMessages and only return the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatMessage.
     * @param {ChatMessageUpsertArgs} args - Arguments to update or create a ChatMessage.
     * @example
     * // Update or create a ChatMessage
     * const chatMessage = await prisma.chatMessage.upsert({
     *   create: {
     *     // ... data to create a ChatMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMessage we want to update
     *   }
     * })
     */
    upsert<T extends ChatMessageUpsertArgs>(args: SelectSubset<T, ChatMessageUpsertArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCountArgs} args - Arguments to filter ChatMessages to count.
     * @example
     * // Count the number of ChatMessages
     * const count = await prisma.chatMessage.count({
     *   where: {
     *     // ... the filter for the ChatMessages we want to count
     *   }
     * })
    **/
    count<T extends ChatMessageCountArgs>(
      args?: Subset<T, ChatMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatMessageAggregateArgs>(args: Subset<T, ChatMessageAggregateArgs>): Prisma.PrismaPromise<GetChatMessageAggregateType<T>>

    /**
     * Group by ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMessageGroupByArgs['orderBy'] }
        : { orderBy?: ChatMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMessage model
   */
  readonly fields: ChatMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatMessage model
   */
  interface ChatMessageFieldRefs {
    readonly id: FieldRef<"ChatMessage", 'Int'>
    readonly senderId: FieldRef<"ChatMessage", 'String'>
    readonly senderType: FieldRef<"ChatMessage", 'String'>
    readonly receiverId: FieldRef<"ChatMessage", 'String'>
    readonly receiverType: FieldRef<"ChatMessage", 'String'>
    readonly message: FieldRef<"ChatMessage", 'String'>
    readonly orderId: FieldRef<"ChatMessage", 'Int'>
    readonly isRead: FieldRef<"ChatMessage", 'Boolean'>
    readonly createdAt: FieldRef<"ChatMessage", 'DateTime'>
    readonly updatedAt: FieldRef<"ChatMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatMessage findUnique
   */
  export type ChatMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage findUniqueOrThrow
   */
  export type ChatMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage findFirst
   */
  export type ChatMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage findFirstOrThrow
   */
  export type ChatMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage findMany
   */
  export type ChatMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Filter, which ChatMessages to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage create
   */
  export type ChatMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a ChatMessage.
     */
    data: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
  }

  /**
   * ChatMessage createMany
   */
  export type ChatMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMessages.
     */
    data: ChatMessageCreateManyInput | ChatMessageCreateManyInput[]
  }

  /**
   * ChatMessage createManyAndReturn
   */
  export type ChatMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The data used to create many ChatMessages.
     */
    data: ChatMessageCreateManyInput | ChatMessageCreateManyInput[]
  }

  /**
   * ChatMessage update
   */
  export type ChatMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a ChatMessage.
     */
    data: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
    /**
     * Choose, which ChatMessage to update.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage updateMany
   */
  export type ChatMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMessages.
     */
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which ChatMessages to update
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to update.
     */
    limit?: number
  }

  /**
   * ChatMessage updateManyAndReturn
   */
  export type ChatMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The data used to update ChatMessages.
     */
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which ChatMessages to update
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to update.
     */
    limit?: number
  }

  /**
   * ChatMessage upsert
   */
  export type ChatMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the ChatMessage to update in case it exists.
     */
    where: ChatMessageWhereUniqueInput
    /**
     * In case the ChatMessage found by the `where` argument doesn't exist, create a new ChatMessage with this data.
     */
    create: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
    /**
     * In case the ChatMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
  }

  /**
   * ChatMessage delete
   */
  export type ChatMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Filter which ChatMessage to delete.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage deleteMany
   */
  export type ChatMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessages to delete
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to delete.
     */
    limit?: number
  }

  /**
   * ChatMessage without action
   */
  export type ChatMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    password: 'password',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const SellerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    password: 'password',
    avatar: 'avatar',
    businessName: 'businessName',
    website: 'website',
    category: 'category',
    subcategories: 'subcategories',
    businessAddress: 'businessAddress',
    businessCity: 'businessCity',
    businessState: 'businessState',
    businessPincode: 'businessPincode',
    businessArea: 'businessArea',
    businessLocality: 'businessLocality',
    businessDescription: 'businessDescription',
    businessImage: 'businessImage',
    openingHours: 'openingHours',
    isVerified: 'isVerified',
    isPromoted: 'isPromoted',
    rating: 'rating',
    totalReviews: 'totalReviews',
    deliveryTime: 'deliveryTime',
    isOpen: 'isOpen',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SellerScalarFieldEnum = (typeof SellerScalarFieldEnum)[keyof typeof SellerScalarFieldEnum]


  export const DeliveryAgentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    password: 'password',
    avatar: 'avatar',
    vehicleNumber: 'vehicleNumber',
    vehicleType: 'vehicleType',
    isAvailable: 'isAvailable',
    currentLocation: 'currentLocation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeliveryAgentScalarFieldEnum = (typeof DeliveryAgentScalarFieldEnum)[keyof typeof DeliveryAgentScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    originalPrice: 'originalPrice',
    image: 'image',
    category: 'category',
    subcategory: 'subcategory',
    stock: 'stock',
    inStock: 'inStock',
    isActive: 'isActive',
    sellerId: 'sellerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    orderNumber: 'orderNumber',
    customerId: 'customerId',
    deliveryAgentId: 'deliveryAgentId',
    orderStatus: 'orderStatus',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    customerAddress: 'customerAddress',
    customerCity: 'customerCity',
    customerArea: 'customerArea',
    customerLocality: 'customerLocality',
    subtotal: 'subtotal',
    deliveryFee: 'deliveryFee',
    taxAmount: 'taxAmount',
    totalAmount: 'totalAmount',
    paymentMethod: 'paymentMethod',
    paymentStatus: 'paymentStatus',
    deliveryInstructions: 'deliveryInstructions',
    estimatedDeliveryTime: 'estimatedDeliveryTime',
    actualDeliveryTime: 'actualDeliveryTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    totalPrice: 'totalPrice',
    productName: 'productName',
    productImage: 'productImage',
    productCategory: 'productCategory'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const SellerOrderScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    sellerId: 'sellerId',
    status: 'status',
    items: 'items',
    subtotal: 'subtotal',
    commission: 'commission',
    netAmount: 'netAmount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SellerOrderScalarFieldEnum = (typeof SellerOrderScalarFieldEnum)[keyof typeof SellerOrderScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    paymentId: 'paymentId',
    orderId: 'orderId',
    customerId: 'customerId',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    paymentStatus: 'paymentStatus',
    transactionId: 'transactionId',
    gateway: 'gateway',
    gatewayResponse: 'gatewayResponse',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const OrderTrackingScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    status: 'status',
    description: 'description',
    location: 'location',
    createdAt: 'createdAt'
  };

  export type OrderTrackingScalarFieldEnum = (typeof OrderTrackingScalarFieldEnum)[keyof typeof OrderTrackingScalarFieldEnum]


  export const ChatMessageScalarFieldEnum: {
    id: 'id',
    senderId: 'senderId',
    senderType: 'senderType',
    receiverId: 'receiverId',
    receiverType: 'receiverType',
    message: 'message',
    orderId: 'orderId',
    isRead: 'isRead',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChatMessageScalarFieldEnum = (typeof ChatMessageScalarFieldEnum)[keyof typeof ChatMessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'TrackingStatus'
   */
  export type EnumTrackingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrackingStatus'>
    
  /**
   * Deep Input Types
   */


  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: IntFilter<"Customer"> | number
    name?: StringFilter<"Customer"> | string
    email?: StringFilter<"Customer"> | string
    phone?: StringNullableFilter<"Customer"> | string | null
    password?: StringFilter<"Customer"> | string
    avatar?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    orders?: OrderListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    orders?: OrderOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringFilter<"Customer"> | string
    phone?: StringNullableFilter<"Customer"> | string | null
    password?: StringFilter<"Customer"> | string
    avatar?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    orders?: OrderListRelationFilter
    payments?: PaymentListRelationFilter
  }, "id" | "email">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Customer"> | number
    name?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringWithAggregatesFilter<"Customer"> | string
    phone?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    password?: StringWithAggregatesFilter<"Customer"> | string
    avatar?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type SellerWhereInput = {
    AND?: SellerWhereInput | SellerWhereInput[]
    OR?: SellerWhereInput[]
    NOT?: SellerWhereInput | SellerWhereInput[]
    id?: IntFilter<"Seller"> | number
    name?: StringFilter<"Seller"> | string
    email?: StringFilter<"Seller"> | string
    phone?: StringNullableFilter<"Seller"> | string | null
    password?: StringFilter<"Seller"> | string
    avatar?: StringNullableFilter<"Seller"> | string | null
    businessName?: StringFilter<"Seller"> | string
    website?: StringNullableFilter<"Seller"> | string | null
    category?: StringFilter<"Seller"> | string
    subcategories?: StringFilter<"Seller"> | string
    businessAddress?: StringFilter<"Seller"> | string
    businessCity?: StringFilter<"Seller"> | string
    businessState?: StringFilter<"Seller"> | string
    businessPincode?: StringFilter<"Seller"> | string
    businessArea?: StringNullableFilter<"Seller"> | string | null
    businessLocality?: StringNullableFilter<"Seller"> | string | null
    businessDescription?: StringNullableFilter<"Seller"> | string | null
    businessImage?: StringNullableFilter<"Seller"> | string | null
    openingHours?: StringNullableFilter<"Seller"> | string | null
    isVerified?: BoolFilter<"Seller"> | boolean
    isPromoted?: BoolFilter<"Seller"> | boolean
    rating?: FloatFilter<"Seller"> | number
    totalReviews?: IntFilter<"Seller"> | number
    deliveryTime?: StringNullableFilter<"Seller"> | string | null
    isOpen?: BoolFilter<"Seller"> | boolean
    createdAt?: DateTimeFilter<"Seller"> | Date | string
    updatedAt?: DateTimeFilter<"Seller"> | Date | string
    products?: ProductListRelationFilter
    sellerOrders?: SellerOrderListRelationFilter
  }

  export type SellerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    businessName?: SortOrder
    website?: SortOrderInput | SortOrder
    category?: SortOrder
    subcategories?: SortOrder
    businessAddress?: SortOrder
    businessCity?: SortOrder
    businessState?: SortOrder
    businessPincode?: SortOrder
    businessArea?: SortOrderInput | SortOrder
    businessLocality?: SortOrderInput | SortOrder
    businessDescription?: SortOrderInput | SortOrder
    businessImage?: SortOrderInput | SortOrder
    openingHours?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    isPromoted?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    deliveryTime?: SortOrderInput | SortOrder
    isOpen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    products?: ProductOrderByRelationAggregateInput
    sellerOrders?: SellerOrderOrderByRelationAggregateInput
  }

  export type SellerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: SellerWhereInput | SellerWhereInput[]
    OR?: SellerWhereInput[]
    NOT?: SellerWhereInput | SellerWhereInput[]
    name?: StringFilter<"Seller"> | string
    phone?: StringNullableFilter<"Seller"> | string | null
    password?: StringFilter<"Seller"> | string
    avatar?: StringNullableFilter<"Seller"> | string | null
    businessName?: StringFilter<"Seller"> | string
    website?: StringNullableFilter<"Seller"> | string | null
    category?: StringFilter<"Seller"> | string
    subcategories?: StringFilter<"Seller"> | string
    businessAddress?: StringFilter<"Seller"> | string
    businessCity?: StringFilter<"Seller"> | string
    businessState?: StringFilter<"Seller"> | string
    businessPincode?: StringFilter<"Seller"> | string
    businessArea?: StringNullableFilter<"Seller"> | string | null
    businessLocality?: StringNullableFilter<"Seller"> | string | null
    businessDescription?: StringNullableFilter<"Seller"> | string | null
    businessImage?: StringNullableFilter<"Seller"> | string | null
    openingHours?: StringNullableFilter<"Seller"> | string | null
    isVerified?: BoolFilter<"Seller"> | boolean
    isPromoted?: BoolFilter<"Seller"> | boolean
    rating?: FloatFilter<"Seller"> | number
    totalReviews?: IntFilter<"Seller"> | number
    deliveryTime?: StringNullableFilter<"Seller"> | string | null
    isOpen?: BoolFilter<"Seller"> | boolean
    createdAt?: DateTimeFilter<"Seller"> | Date | string
    updatedAt?: DateTimeFilter<"Seller"> | Date | string
    products?: ProductListRelationFilter
    sellerOrders?: SellerOrderListRelationFilter
  }, "id" | "email">

  export type SellerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    businessName?: SortOrder
    website?: SortOrderInput | SortOrder
    category?: SortOrder
    subcategories?: SortOrder
    businessAddress?: SortOrder
    businessCity?: SortOrder
    businessState?: SortOrder
    businessPincode?: SortOrder
    businessArea?: SortOrderInput | SortOrder
    businessLocality?: SortOrderInput | SortOrder
    businessDescription?: SortOrderInput | SortOrder
    businessImage?: SortOrderInput | SortOrder
    openingHours?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    isPromoted?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    deliveryTime?: SortOrderInput | SortOrder
    isOpen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SellerCountOrderByAggregateInput
    _avg?: SellerAvgOrderByAggregateInput
    _max?: SellerMaxOrderByAggregateInput
    _min?: SellerMinOrderByAggregateInput
    _sum?: SellerSumOrderByAggregateInput
  }

  export type SellerScalarWhereWithAggregatesInput = {
    AND?: SellerScalarWhereWithAggregatesInput | SellerScalarWhereWithAggregatesInput[]
    OR?: SellerScalarWhereWithAggregatesInput[]
    NOT?: SellerScalarWhereWithAggregatesInput | SellerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Seller"> | number
    name?: StringWithAggregatesFilter<"Seller"> | string
    email?: StringWithAggregatesFilter<"Seller"> | string
    phone?: StringNullableWithAggregatesFilter<"Seller"> | string | null
    password?: StringWithAggregatesFilter<"Seller"> | string
    avatar?: StringNullableWithAggregatesFilter<"Seller"> | string | null
    businessName?: StringWithAggregatesFilter<"Seller"> | string
    website?: StringNullableWithAggregatesFilter<"Seller"> | string | null
    category?: StringWithAggregatesFilter<"Seller"> | string
    subcategories?: StringWithAggregatesFilter<"Seller"> | string
    businessAddress?: StringWithAggregatesFilter<"Seller"> | string
    businessCity?: StringWithAggregatesFilter<"Seller"> | string
    businessState?: StringWithAggregatesFilter<"Seller"> | string
    businessPincode?: StringWithAggregatesFilter<"Seller"> | string
    businessArea?: StringNullableWithAggregatesFilter<"Seller"> | string | null
    businessLocality?: StringNullableWithAggregatesFilter<"Seller"> | string | null
    businessDescription?: StringNullableWithAggregatesFilter<"Seller"> | string | null
    businessImage?: StringNullableWithAggregatesFilter<"Seller"> | string | null
    openingHours?: StringNullableWithAggregatesFilter<"Seller"> | string | null
    isVerified?: BoolWithAggregatesFilter<"Seller"> | boolean
    isPromoted?: BoolWithAggregatesFilter<"Seller"> | boolean
    rating?: FloatWithAggregatesFilter<"Seller"> | number
    totalReviews?: IntWithAggregatesFilter<"Seller"> | number
    deliveryTime?: StringNullableWithAggregatesFilter<"Seller"> | string | null
    isOpen?: BoolWithAggregatesFilter<"Seller"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Seller"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Seller"> | Date | string
  }

  export type DeliveryAgentWhereInput = {
    AND?: DeliveryAgentWhereInput | DeliveryAgentWhereInput[]
    OR?: DeliveryAgentWhereInput[]
    NOT?: DeliveryAgentWhereInput | DeliveryAgentWhereInput[]
    id?: IntFilter<"DeliveryAgent"> | number
    name?: StringFilter<"DeliveryAgent"> | string
    email?: StringFilter<"DeliveryAgent"> | string
    phone?: StringNullableFilter<"DeliveryAgent"> | string | null
    password?: StringFilter<"DeliveryAgent"> | string
    avatar?: StringNullableFilter<"DeliveryAgent"> | string | null
    vehicleNumber?: StringFilter<"DeliveryAgent"> | string
    vehicleType?: StringFilter<"DeliveryAgent"> | string
    isAvailable?: BoolFilter<"DeliveryAgent"> | boolean
    currentLocation?: StringNullableFilter<"DeliveryAgent"> | string | null
    createdAt?: DateTimeFilter<"DeliveryAgent"> | Date | string
    updatedAt?: DateTimeFilter<"DeliveryAgent"> | Date | string
    deliveryOrders?: OrderListRelationFilter
  }

  export type DeliveryAgentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    vehicleNumber?: SortOrder
    vehicleType?: SortOrder
    isAvailable?: SortOrder
    currentLocation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deliveryOrders?: OrderOrderByRelationAggregateInput
  }

  export type DeliveryAgentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: DeliveryAgentWhereInput | DeliveryAgentWhereInput[]
    OR?: DeliveryAgentWhereInput[]
    NOT?: DeliveryAgentWhereInput | DeliveryAgentWhereInput[]
    name?: StringFilter<"DeliveryAgent"> | string
    phone?: StringNullableFilter<"DeliveryAgent"> | string | null
    password?: StringFilter<"DeliveryAgent"> | string
    avatar?: StringNullableFilter<"DeliveryAgent"> | string | null
    vehicleNumber?: StringFilter<"DeliveryAgent"> | string
    vehicleType?: StringFilter<"DeliveryAgent"> | string
    isAvailable?: BoolFilter<"DeliveryAgent"> | boolean
    currentLocation?: StringNullableFilter<"DeliveryAgent"> | string | null
    createdAt?: DateTimeFilter<"DeliveryAgent"> | Date | string
    updatedAt?: DateTimeFilter<"DeliveryAgent"> | Date | string
    deliveryOrders?: OrderListRelationFilter
  }, "id" | "email">

  export type DeliveryAgentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    vehicleNumber?: SortOrder
    vehicleType?: SortOrder
    isAvailable?: SortOrder
    currentLocation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeliveryAgentCountOrderByAggregateInput
    _avg?: DeliveryAgentAvgOrderByAggregateInput
    _max?: DeliveryAgentMaxOrderByAggregateInput
    _min?: DeliveryAgentMinOrderByAggregateInput
    _sum?: DeliveryAgentSumOrderByAggregateInput
  }

  export type DeliveryAgentScalarWhereWithAggregatesInput = {
    AND?: DeliveryAgentScalarWhereWithAggregatesInput | DeliveryAgentScalarWhereWithAggregatesInput[]
    OR?: DeliveryAgentScalarWhereWithAggregatesInput[]
    NOT?: DeliveryAgentScalarWhereWithAggregatesInput | DeliveryAgentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DeliveryAgent"> | number
    name?: StringWithAggregatesFilter<"DeliveryAgent"> | string
    email?: StringWithAggregatesFilter<"DeliveryAgent"> | string
    phone?: StringNullableWithAggregatesFilter<"DeliveryAgent"> | string | null
    password?: StringWithAggregatesFilter<"DeliveryAgent"> | string
    avatar?: StringNullableWithAggregatesFilter<"DeliveryAgent"> | string | null
    vehicleNumber?: StringWithAggregatesFilter<"DeliveryAgent"> | string
    vehicleType?: StringWithAggregatesFilter<"DeliveryAgent"> | string
    isAvailable?: BoolWithAggregatesFilter<"DeliveryAgent"> | boolean
    currentLocation?: StringNullableWithAggregatesFilter<"DeliveryAgent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DeliveryAgent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DeliveryAgent"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatFilter<"Product"> | number
    originalPrice?: FloatNullableFilter<"Product"> | number | null
    image?: StringNullableFilter<"Product"> | string | null
    category?: StringNullableFilter<"Product"> | string | null
    subcategory?: StringNullableFilter<"Product"> | string | null
    stock?: IntFilter<"Product"> | number
    inStock?: BoolFilter<"Product"> | boolean
    isActive?: BoolFilter<"Product"> | boolean
    sellerId?: IntFilter<"Product"> | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    seller?: XOR<SellerScalarRelationFilter, SellerWhereInput>
    orderItems?: OrderItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    originalPrice?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    subcategory?: SortOrderInput | SortOrder
    stock?: SortOrder
    inStock?: SortOrder
    isActive?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    seller?: SellerOrderByWithRelationInput
    orderItems?: OrderItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatFilter<"Product"> | number
    originalPrice?: FloatNullableFilter<"Product"> | number | null
    image?: StringNullableFilter<"Product"> | string | null
    category?: StringNullableFilter<"Product"> | string | null
    subcategory?: StringNullableFilter<"Product"> | string | null
    stock?: IntFilter<"Product"> | number
    inStock?: BoolFilter<"Product"> | boolean
    isActive?: BoolFilter<"Product"> | boolean
    sellerId?: IntFilter<"Product"> | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    seller?: XOR<SellerScalarRelationFilter, SellerWhereInput>
    orderItems?: OrderItemListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    originalPrice?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    subcategory?: SortOrderInput | SortOrder
    stock?: SortOrder
    inStock?: SortOrder
    isActive?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    price?: FloatWithAggregatesFilter<"Product"> | number
    originalPrice?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    image?: StringNullableWithAggregatesFilter<"Product"> | string | null
    category?: StringNullableWithAggregatesFilter<"Product"> | string | null
    subcategory?: StringNullableWithAggregatesFilter<"Product"> | string | null
    stock?: IntWithAggregatesFilter<"Product"> | number
    inStock?: BoolWithAggregatesFilter<"Product"> | boolean
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean
    sellerId?: IntWithAggregatesFilter<"Product"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: IntFilter<"Order"> | number
    orderNumber?: StringFilter<"Order"> | string
    customerId?: IntFilter<"Order"> | number
    deliveryAgentId?: IntNullableFilter<"Order"> | number | null
    orderStatus?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    customerName?: StringFilter<"Order"> | string
    customerPhone?: StringFilter<"Order"> | string
    customerAddress?: StringFilter<"Order"> | string
    customerCity?: StringFilter<"Order"> | string
    customerArea?: StringFilter<"Order"> | string
    customerLocality?: StringNullableFilter<"Order"> | string | null
    subtotal?: FloatFilter<"Order"> | number
    deliveryFee?: FloatFilter<"Order"> | number
    taxAmount?: FloatFilter<"Order"> | number
    totalAmount?: FloatFilter<"Order"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Order"> | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFilter<"Order"> | $Enums.PaymentStatus
    deliveryInstructions?: StringNullableFilter<"Order"> | string | null
    estimatedDeliveryTime?: DateTimeNullableFilter<"Order"> | Date | string | null
    actualDeliveryTime?: DateTimeNullableFilter<"Order"> | Date | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    deliveryAgent?: XOR<DeliveryAgentNullableScalarRelationFilter, DeliveryAgentWhereInput> | null
    items?: OrderItemListRelationFilter
    sellerOrders?: SellerOrderListRelationFilter
    payments?: PaymentListRelationFilter
    tracking?: OrderTrackingListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    deliveryAgentId?: SortOrderInput | SortOrder
    orderStatus?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerAddress?: SortOrder
    customerCity?: SortOrder
    customerArea?: SortOrder
    customerLocality?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    deliveryInstructions?: SortOrderInput | SortOrder
    estimatedDeliveryTime?: SortOrderInput | SortOrder
    actualDeliveryTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    deliveryAgent?: DeliveryAgentOrderByWithRelationInput
    items?: OrderItemOrderByRelationAggregateInput
    sellerOrders?: SellerOrderOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    tracking?: OrderTrackingOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    orderNumber?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    customerId?: IntFilter<"Order"> | number
    deliveryAgentId?: IntNullableFilter<"Order"> | number | null
    orderStatus?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    customerName?: StringFilter<"Order"> | string
    customerPhone?: StringFilter<"Order"> | string
    customerAddress?: StringFilter<"Order"> | string
    customerCity?: StringFilter<"Order"> | string
    customerArea?: StringFilter<"Order"> | string
    customerLocality?: StringNullableFilter<"Order"> | string | null
    subtotal?: FloatFilter<"Order"> | number
    deliveryFee?: FloatFilter<"Order"> | number
    taxAmount?: FloatFilter<"Order"> | number
    totalAmount?: FloatFilter<"Order"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Order"> | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFilter<"Order"> | $Enums.PaymentStatus
    deliveryInstructions?: StringNullableFilter<"Order"> | string | null
    estimatedDeliveryTime?: DateTimeNullableFilter<"Order"> | Date | string | null
    actualDeliveryTime?: DateTimeNullableFilter<"Order"> | Date | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    deliveryAgent?: XOR<DeliveryAgentNullableScalarRelationFilter, DeliveryAgentWhereInput> | null
    items?: OrderItemListRelationFilter
    sellerOrders?: SellerOrderListRelationFilter
    payments?: PaymentListRelationFilter
    tracking?: OrderTrackingListRelationFilter
  }, "id" | "orderNumber">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    deliveryAgentId?: SortOrderInput | SortOrder
    orderStatus?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerAddress?: SortOrder
    customerCity?: SortOrder
    customerArea?: SortOrder
    customerLocality?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    deliveryInstructions?: SortOrderInput | SortOrder
    estimatedDeliveryTime?: SortOrderInput | SortOrder
    actualDeliveryTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Order"> | number
    orderNumber?: StringWithAggregatesFilter<"Order"> | string
    customerId?: IntWithAggregatesFilter<"Order"> | number
    deliveryAgentId?: IntNullableWithAggregatesFilter<"Order"> | number | null
    orderStatus?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    customerName?: StringWithAggregatesFilter<"Order"> | string
    customerPhone?: StringWithAggregatesFilter<"Order"> | string
    customerAddress?: StringWithAggregatesFilter<"Order"> | string
    customerCity?: StringWithAggregatesFilter<"Order"> | string
    customerArea?: StringWithAggregatesFilter<"Order"> | string
    customerLocality?: StringNullableWithAggregatesFilter<"Order"> | string | null
    subtotal?: FloatWithAggregatesFilter<"Order"> | number
    deliveryFee?: FloatWithAggregatesFilter<"Order"> | number
    taxAmount?: FloatWithAggregatesFilter<"Order"> | number
    totalAmount?: FloatWithAggregatesFilter<"Order"> | number
    paymentMethod?: EnumPaymentMethodWithAggregatesFilter<"Order"> | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"Order"> | $Enums.PaymentStatus
    deliveryInstructions?: StringNullableWithAggregatesFilter<"Order"> | string | null
    estimatedDeliveryTime?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    actualDeliveryTime?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: IntFilter<"OrderItem"> | number
    orderId?: IntFilter<"OrderItem"> | number
    productId?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    unitPrice?: FloatFilter<"OrderItem"> | number
    totalPrice?: FloatFilter<"OrderItem"> | number
    productName?: StringFilter<"OrderItem"> | string
    productImage?: StringNullableFilter<"OrderItem"> | string | null
    productCategory?: StringNullableFilter<"OrderItem"> | string | null
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    productName?: SortOrder
    productImage?: SortOrderInput | SortOrder
    productCategory?: SortOrderInput | SortOrder
    order?: OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: IntFilter<"OrderItem"> | number
    productId?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    unitPrice?: FloatFilter<"OrderItem"> | number
    totalPrice?: FloatFilter<"OrderItem"> | number
    productName?: StringFilter<"OrderItem"> | string
    productImage?: StringNullableFilter<"OrderItem"> | string | null
    productCategory?: StringNullableFilter<"OrderItem"> | string | null
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    productName?: SortOrder
    productImage?: SortOrderInput | SortOrder
    productCategory?: SortOrderInput | SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OrderItem"> | number
    orderId?: IntWithAggregatesFilter<"OrderItem"> | number
    productId?: IntWithAggregatesFilter<"OrderItem"> | number
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    unitPrice?: FloatWithAggregatesFilter<"OrderItem"> | number
    totalPrice?: FloatWithAggregatesFilter<"OrderItem"> | number
    productName?: StringWithAggregatesFilter<"OrderItem"> | string
    productImage?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
    productCategory?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
  }

  export type SellerOrderWhereInput = {
    AND?: SellerOrderWhereInput | SellerOrderWhereInput[]
    OR?: SellerOrderWhereInput[]
    NOT?: SellerOrderWhereInput | SellerOrderWhereInput[]
    id?: IntFilter<"SellerOrder"> | number
    orderId?: IntFilter<"SellerOrder"> | number
    sellerId?: IntFilter<"SellerOrder"> | number
    status?: EnumOrderStatusFilter<"SellerOrder"> | $Enums.OrderStatus
    items?: JsonFilter<"SellerOrder">
    subtotal?: FloatFilter<"SellerOrder"> | number
    commission?: FloatFilter<"SellerOrder"> | number
    netAmount?: FloatFilter<"SellerOrder"> | number
    createdAt?: DateTimeFilter<"SellerOrder"> | Date | string
    updatedAt?: DateTimeFilter<"SellerOrder"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    seller?: XOR<SellerScalarRelationFilter, SellerWhereInput>
  }

  export type SellerOrderOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    sellerId?: SortOrder
    status?: SortOrder
    items?: SortOrder
    subtotal?: SortOrder
    commission?: SortOrder
    netAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    seller?: SellerOrderByWithRelationInput
  }

  export type SellerOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    orderId_sellerId?: SellerOrderOrderIdSellerIdCompoundUniqueInput
    AND?: SellerOrderWhereInput | SellerOrderWhereInput[]
    OR?: SellerOrderWhereInput[]
    NOT?: SellerOrderWhereInput | SellerOrderWhereInput[]
    orderId?: IntFilter<"SellerOrder"> | number
    sellerId?: IntFilter<"SellerOrder"> | number
    status?: EnumOrderStatusFilter<"SellerOrder"> | $Enums.OrderStatus
    items?: JsonFilter<"SellerOrder">
    subtotal?: FloatFilter<"SellerOrder"> | number
    commission?: FloatFilter<"SellerOrder"> | number
    netAmount?: FloatFilter<"SellerOrder"> | number
    createdAt?: DateTimeFilter<"SellerOrder"> | Date | string
    updatedAt?: DateTimeFilter<"SellerOrder"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    seller?: XOR<SellerScalarRelationFilter, SellerWhereInput>
  }, "id" | "orderId_sellerId">

  export type SellerOrderOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    sellerId?: SortOrder
    status?: SortOrder
    items?: SortOrder
    subtotal?: SortOrder
    commission?: SortOrder
    netAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SellerOrderCountOrderByAggregateInput
    _avg?: SellerOrderAvgOrderByAggregateInput
    _max?: SellerOrderMaxOrderByAggregateInput
    _min?: SellerOrderMinOrderByAggregateInput
    _sum?: SellerOrderSumOrderByAggregateInput
  }

  export type SellerOrderScalarWhereWithAggregatesInput = {
    AND?: SellerOrderScalarWhereWithAggregatesInput | SellerOrderScalarWhereWithAggregatesInput[]
    OR?: SellerOrderScalarWhereWithAggregatesInput[]
    NOT?: SellerOrderScalarWhereWithAggregatesInput | SellerOrderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SellerOrder"> | number
    orderId?: IntWithAggregatesFilter<"SellerOrder"> | number
    sellerId?: IntWithAggregatesFilter<"SellerOrder"> | number
    status?: EnumOrderStatusWithAggregatesFilter<"SellerOrder"> | $Enums.OrderStatus
    items?: JsonWithAggregatesFilter<"SellerOrder">
    subtotal?: FloatWithAggregatesFilter<"SellerOrder"> | number
    commission?: FloatWithAggregatesFilter<"SellerOrder"> | number
    netAmount?: FloatWithAggregatesFilter<"SellerOrder"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SellerOrder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SellerOrder"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: IntFilter<"Payment"> | number
    paymentId?: StringFilter<"Payment"> | string
    orderId?: IntFilter<"Payment"> | number
    customerId?: IntFilter<"Payment"> | number
    amount?: FloatFilter<"Payment"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    transactionId?: StringNullableFilter<"Payment"> | string | null
    gateway?: StringNullableFilter<"Payment"> | string | null
    gatewayResponse?: JsonNullableFilter<"Payment">
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    paymentId?: SortOrder
    orderId?: SortOrder
    customerId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    gateway?: SortOrderInput | SortOrder
    gatewayResponse?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    paymentId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    orderId?: IntFilter<"Payment"> | number
    customerId?: IntFilter<"Payment"> | number
    amount?: FloatFilter<"Payment"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    transactionId?: StringNullableFilter<"Payment"> | string | null
    gateway?: StringNullableFilter<"Payment"> | string | null
    gatewayResponse?: JsonNullableFilter<"Payment">
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
  }, "id" | "paymentId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    paymentId?: SortOrder
    orderId?: SortOrder
    customerId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    gateway?: SortOrderInput | SortOrder
    gatewayResponse?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Payment"> | number
    paymentId?: StringWithAggregatesFilter<"Payment"> | string
    orderId?: IntWithAggregatesFilter<"Payment"> | number
    customerId?: IntWithAggregatesFilter<"Payment"> | number
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    paymentMethod?: EnumPaymentMethodWithAggregatesFilter<"Payment"> | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    transactionId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    gateway?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    gatewayResponse?: JsonNullableWithAggregatesFilter<"Payment">
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type OrderTrackingWhereInput = {
    AND?: OrderTrackingWhereInput | OrderTrackingWhereInput[]
    OR?: OrderTrackingWhereInput[]
    NOT?: OrderTrackingWhereInput | OrderTrackingWhereInput[]
    id?: IntFilter<"OrderTracking"> | number
    orderId?: IntFilter<"OrderTracking"> | number
    status?: EnumTrackingStatusFilter<"OrderTracking"> | $Enums.TrackingStatus
    description?: StringFilter<"OrderTracking"> | string
    location?: StringNullableFilter<"OrderTracking"> | string | null
    createdAt?: DateTimeFilter<"OrderTracking"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderTrackingOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    description?: SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type OrderTrackingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrderTrackingWhereInput | OrderTrackingWhereInput[]
    OR?: OrderTrackingWhereInput[]
    NOT?: OrderTrackingWhereInput | OrderTrackingWhereInput[]
    orderId?: IntFilter<"OrderTracking"> | number
    status?: EnumTrackingStatusFilter<"OrderTracking"> | $Enums.TrackingStatus
    description?: StringFilter<"OrderTracking"> | string
    location?: StringNullableFilter<"OrderTracking"> | string | null
    createdAt?: DateTimeFilter<"OrderTracking"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type OrderTrackingOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    description?: SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OrderTrackingCountOrderByAggregateInput
    _avg?: OrderTrackingAvgOrderByAggregateInput
    _max?: OrderTrackingMaxOrderByAggregateInput
    _min?: OrderTrackingMinOrderByAggregateInput
    _sum?: OrderTrackingSumOrderByAggregateInput
  }

  export type OrderTrackingScalarWhereWithAggregatesInput = {
    AND?: OrderTrackingScalarWhereWithAggregatesInput | OrderTrackingScalarWhereWithAggregatesInput[]
    OR?: OrderTrackingScalarWhereWithAggregatesInput[]
    NOT?: OrderTrackingScalarWhereWithAggregatesInput | OrderTrackingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OrderTracking"> | number
    orderId?: IntWithAggregatesFilter<"OrderTracking"> | number
    status?: EnumTrackingStatusWithAggregatesFilter<"OrderTracking"> | $Enums.TrackingStatus
    description?: StringWithAggregatesFilter<"OrderTracking"> | string
    location?: StringNullableWithAggregatesFilter<"OrderTracking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OrderTracking"> | Date | string
  }

  export type ChatMessageWhereInput = {
    AND?: ChatMessageWhereInput | ChatMessageWhereInput[]
    OR?: ChatMessageWhereInput[]
    NOT?: ChatMessageWhereInput | ChatMessageWhereInput[]
    id?: IntFilter<"ChatMessage"> | number
    senderId?: StringFilter<"ChatMessage"> | string
    senderType?: StringFilter<"ChatMessage"> | string
    receiverId?: StringFilter<"ChatMessage"> | string
    receiverType?: StringFilter<"ChatMessage"> | string
    message?: StringFilter<"ChatMessage"> | string
    orderId?: IntNullableFilter<"ChatMessage"> | number | null
    isRead?: BoolFilter<"ChatMessage"> | boolean
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    updatedAt?: DateTimeFilter<"ChatMessage"> | Date | string
  }

  export type ChatMessageOrderByWithRelationInput = {
    id?: SortOrder
    senderId?: SortOrder
    senderType?: SortOrder
    receiverId?: SortOrder
    receiverType?: SortOrder
    message?: SortOrder
    orderId?: SortOrderInput | SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChatMessageWhereInput | ChatMessageWhereInput[]
    OR?: ChatMessageWhereInput[]
    NOT?: ChatMessageWhereInput | ChatMessageWhereInput[]
    senderId?: StringFilter<"ChatMessage"> | string
    senderType?: StringFilter<"ChatMessage"> | string
    receiverId?: StringFilter<"ChatMessage"> | string
    receiverType?: StringFilter<"ChatMessage"> | string
    message?: StringFilter<"ChatMessage"> | string
    orderId?: IntNullableFilter<"ChatMessage"> | number | null
    isRead?: BoolFilter<"ChatMessage"> | boolean
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    updatedAt?: DateTimeFilter<"ChatMessage"> | Date | string
  }, "id">

  export type ChatMessageOrderByWithAggregationInput = {
    id?: SortOrder
    senderId?: SortOrder
    senderType?: SortOrder
    receiverId?: SortOrder
    receiverType?: SortOrder
    message?: SortOrder
    orderId?: SortOrderInput | SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChatMessageCountOrderByAggregateInput
    _avg?: ChatMessageAvgOrderByAggregateInput
    _max?: ChatMessageMaxOrderByAggregateInput
    _min?: ChatMessageMinOrderByAggregateInput
    _sum?: ChatMessageSumOrderByAggregateInput
  }

  export type ChatMessageScalarWhereWithAggregatesInput = {
    AND?: ChatMessageScalarWhereWithAggregatesInput | ChatMessageScalarWhereWithAggregatesInput[]
    OR?: ChatMessageScalarWhereWithAggregatesInput[]
    NOT?: ChatMessageScalarWhereWithAggregatesInput | ChatMessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ChatMessage"> | number
    senderId?: StringWithAggregatesFilter<"ChatMessage"> | string
    senderType?: StringWithAggregatesFilter<"ChatMessage"> | string
    receiverId?: StringWithAggregatesFilter<"ChatMessage"> | string
    receiverType?: StringWithAggregatesFilter<"ChatMessage"> | string
    message?: StringWithAggregatesFilter<"ChatMessage"> | string
    orderId?: IntNullableWithAggregatesFilter<"ChatMessage"> | number | null
    isRead?: BoolWithAggregatesFilter<"ChatMessage"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ChatMessage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ChatMessage"> | Date | string
  }

  export type CustomerCreateInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutCustomerInput
    payments?: PaymentCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PaymentUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutCustomerNestedInput
    payments?: PaymentUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerCreateInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    businessName: string
    website?: string | null
    category: string
    subcategories: string
    businessAddress: string
    businessCity: string
    businessState: string
    businessPincode: string
    businessArea?: string | null
    businessLocality?: string | null
    businessDescription?: string | null
    businessImage?: string | null
    openingHours?: string | null
    isVerified?: boolean
    isPromoted?: boolean
    rating?: number
    totalReviews?: number
    deliveryTime?: string | null
    isOpen?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutSellerInput
    sellerOrders?: SellerOrderCreateNestedManyWithoutSellerInput
  }

  export type SellerUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    businessName: string
    website?: string | null
    category: string
    subcategories: string
    businessAddress: string
    businessCity: string
    businessState: string
    businessPincode: string
    businessArea?: string | null
    businessLocality?: string | null
    businessDescription?: string | null
    businessImage?: string | null
    openingHours?: string | null
    isVerified?: boolean
    isPromoted?: boolean
    rating?: number
    totalReviews?: number
    deliveryTime?: string | null
    isOpen?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutSellerInput
    sellerOrders?: SellerOrderUncheckedCreateNestedManyWithoutSellerInput
  }

  export type SellerUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    subcategories?: StringFieldUpdateOperationsInput | string
    businessAddress?: StringFieldUpdateOperationsInput | string
    businessCity?: StringFieldUpdateOperationsInput | string
    businessState?: StringFieldUpdateOperationsInput | string
    businessPincode?: StringFieldUpdateOperationsInput | string
    businessArea?: NullableStringFieldUpdateOperationsInput | string | null
    businessLocality?: NullableStringFieldUpdateOperationsInput | string | null
    businessDescription?: NullableStringFieldUpdateOperationsInput | string | null
    businessImage?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isPromoted?: BoolFieldUpdateOperationsInput | boolean
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    deliveryTime?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutSellerNestedInput
    sellerOrders?: SellerOrderUpdateManyWithoutSellerNestedInput
  }

  export type SellerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    subcategories?: StringFieldUpdateOperationsInput | string
    businessAddress?: StringFieldUpdateOperationsInput | string
    businessCity?: StringFieldUpdateOperationsInput | string
    businessState?: StringFieldUpdateOperationsInput | string
    businessPincode?: StringFieldUpdateOperationsInput | string
    businessArea?: NullableStringFieldUpdateOperationsInput | string | null
    businessLocality?: NullableStringFieldUpdateOperationsInput | string | null
    businessDescription?: NullableStringFieldUpdateOperationsInput | string | null
    businessImage?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isPromoted?: BoolFieldUpdateOperationsInput | boolean
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    deliveryTime?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutSellerNestedInput
    sellerOrders?: SellerOrderUncheckedUpdateManyWithoutSellerNestedInput
  }

  export type SellerCreateManyInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    businessName: string
    website?: string | null
    category: string
    subcategories: string
    businessAddress: string
    businessCity: string
    businessState: string
    businessPincode: string
    businessArea?: string | null
    businessLocality?: string | null
    businessDescription?: string | null
    businessImage?: string | null
    openingHours?: string | null
    isVerified?: boolean
    isPromoted?: boolean
    rating?: number
    totalReviews?: number
    deliveryTime?: string | null
    isOpen?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SellerUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    subcategories?: StringFieldUpdateOperationsInput | string
    businessAddress?: StringFieldUpdateOperationsInput | string
    businessCity?: StringFieldUpdateOperationsInput | string
    businessState?: StringFieldUpdateOperationsInput | string
    businessPincode?: StringFieldUpdateOperationsInput | string
    businessArea?: NullableStringFieldUpdateOperationsInput | string | null
    businessLocality?: NullableStringFieldUpdateOperationsInput | string | null
    businessDescription?: NullableStringFieldUpdateOperationsInput | string | null
    businessImage?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isPromoted?: BoolFieldUpdateOperationsInput | boolean
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    deliveryTime?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    subcategories?: StringFieldUpdateOperationsInput | string
    businessAddress?: StringFieldUpdateOperationsInput | string
    businessCity?: StringFieldUpdateOperationsInput | string
    businessState?: StringFieldUpdateOperationsInput | string
    businessPincode?: StringFieldUpdateOperationsInput | string
    businessArea?: NullableStringFieldUpdateOperationsInput | string | null
    businessLocality?: NullableStringFieldUpdateOperationsInput | string | null
    businessDescription?: NullableStringFieldUpdateOperationsInput | string | null
    businessImage?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isPromoted?: BoolFieldUpdateOperationsInput | boolean
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    deliveryTime?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryAgentCreateInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    vehicleNumber: string
    vehicleType: string
    isAvailable?: boolean
    currentLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveryOrders?: OrderCreateNestedManyWithoutDeliveryAgentInput
  }

  export type DeliveryAgentUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    vehicleNumber: string
    vehicleType: string
    isAvailable?: boolean
    currentLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveryOrders?: OrderUncheckedCreateNestedManyWithoutDeliveryAgentInput
  }

  export type DeliveryAgentUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNumber?: StringFieldUpdateOperationsInput | string
    vehicleType?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryOrders?: OrderUpdateManyWithoutDeliveryAgentNestedInput
  }

  export type DeliveryAgentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNumber?: StringFieldUpdateOperationsInput | string
    vehicleType?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryOrders?: OrderUncheckedUpdateManyWithoutDeliveryAgentNestedInput
  }

  export type DeliveryAgentCreateManyInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    vehicleNumber: string
    vehicleType: string
    isAvailable?: boolean
    currentLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryAgentUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNumber?: StringFieldUpdateOperationsInput | string
    vehicleType?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryAgentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNumber?: StringFieldUpdateOperationsInput | string
    vehicleType?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    name: string
    description?: string | null
    price: number
    originalPrice?: number | null
    image?: string | null
    category?: string | null
    subcategory?: string | null
    stock?: number
    inStock?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    seller: SellerCreateNestedOneWithoutProductsInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    price: number
    originalPrice?: number | null
    image?: string | null
    category?: string | null
    subcategory?: string | null
    stock?: number
    inStock?: boolean
    isActive?: boolean
    sellerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    inStock?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seller?: SellerUpdateOneRequiredWithoutProductsNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    inStock?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sellerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    price: number
    originalPrice?: number | null
    image?: string | null
    category?: string | null
    subcategory?: string | null
    stock?: number
    inStock?: boolean
    isActive?: boolean
    sellerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    inStock?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    inStock?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sellerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    orderNumber: string
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    deliveryAgent?: DeliveryAgentCreateNestedOneWithoutDeliveryOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    sellerOrders?: SellerOrderCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
    tracking?: OrderTrackingCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: number
    orderNumber: string
    customerId: number
    deliveryAgentId?: number | null
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    sellerOrders?: SellerOrderUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
    tracking?: OrderTrackingUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    orderNumber?: StringFieldUpdateOperationsInput | string
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    deliveryAgent?: DeliveryAgentUpdateOneWithoutDeliveryOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    sellerOrders?: SellerOrderUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
    tracking?: OrderTrackingUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    deliveryAgentId?: NullableIntFieldUpdateOperationsInput | number | null
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    sellerOrders?: SellerOrderUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
    tracking?: OrderTrackingUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: number
    orderNumber: string
    customerId: number
    deliveryAgentId?: number | null
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    orderNumber?: StringFieldUpdateOperationsInput | string
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    deliveryAgentId?: NullableIntFieldUpdateOperationsInput | number | null
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    quantity: number
    unitPrice: number
    totalPrice: number
    productName: string
    productImage?: string | null
    productCategory?: string | null
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: number
    orderId: number
    productId: number
    quantity: number
    unitPrice: number
    totalPrice: number
    productName: string
    productImage?: string | null
    productCategory?: string | null
  }

  export type OrderItemUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemCreateManyInput = {
    id?: number
    orderId: number
    productId: number
    quantity: number
    unitPrice: number
    totalPrice: number
    productName: string
    productImage?: string | null
    productCategory?: string | null
  }

  export type OrderItemUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SellerOrderCreateInput = {
    status?: $Enums.OrderStatus
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    commission?: number
    netAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutSellerOrdersInput
    seller: SellerCreateNestedOneWithoutSellerOrdersInput
  }

  export type SellerOrderUncheckedCreateInput = {
    id?: number
    orderId: number
    sellerId: number
    status?: $Enums.OrderStatus
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    commission?: number
    netAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SellerOrderUpdateInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutSellerOrdersNestedInput
    seller?: SellerUpdateOneRequiredWithoutSellerOrdersNestedInput
  }

  export type SellerOrderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    sellerId?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerOrderCreateManyInput = {
    id?: number
    orderId: number
    sellerId: number
    status?: $Enums.OrderStatus
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    commission?: number
    netAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SellerOrderUpdateManyMutationInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerOrderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    sellerId?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    paymentId: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    transactionId?: string | null
    gateway?: string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutPaymentsInput
    customer: CustomerCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: number
    paymentId: string
    orderId: number
    customerId: number
    amount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    transactionId?: string | null
    gateway?: string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    gateway?: NullableStringFieldUpdateOperationsInput | string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutPaymentsNestedInput
    customer?: CustomerUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    paymentId?: StringFieldUpdateOperationsInput | string
    orderId?: IntFieldUpdateOperationsInput | number
    customerId?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    gateway?: NullableStringFieldUpdateOperationsInput | string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: number
    paymentId: string
    orderId: number
    customerId: number
    amount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    transactionId?: string | null
    gateway?: string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    gateway?: NullableStringFieldUpdateOperationsInput | string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    paymentId?: StringFieldUpdateOperationsInput | string
    orderId?: IntFieldUpdateOperationsInput | number
    customerId?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    gateway?: NullableStringFieldUpdateOperationsInput | string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderTrackingCreateInput = {
    status: $Enums.TrackingStatus
    description: string
    location?: string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutTrackingInput
  }

  export type OrderTrackingUncheckedCreateInput = {
    id?: number
    orderId: number
    status: $Enums.TrackingStatus
    description: string
    location?: string | null
    createdAt?: Date | string
  }

  export type OrderTrackingUpdateInput = {
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutTrackingNestedInput
  }

  export type OrderTrackingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderTrackingCreateManyInput = {
    id?: number
    orderId: number
    status: $Enums.TrackingStatus
    description: string
    location?: string | null
    createdAt?: Date | string
  }

  export type OrderTrackingUpdateManyMutationInput = {
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderTrackingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageCreateInput = {
    senderId: string
    senderType: string
    receiverId: string
    receiverType: string
    message: string
    orderId?: number | null
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageUncheckedCreateInput = {
    id?: number
    senderId: string
    senderType: string
    receiverId: string
    receiverType: string
    message: string
    orderId?: number | null
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageUpdateInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    receiverType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    receiverType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageCreateManyInput = {
    id?: number
    senderId: string
    senderType: string
    receiverId: string
    receiverType: string
    message: string
    orderId?: number | null
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageUpdateManyMutationInput = {
    senderId?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    receiverType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    receiverType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    orderId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type SellerOrderListRelationFilter = {
    every?: SellerOrderWhereInput
    some?: SellerOrderWhereInput
    none?: SellerOrderWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SellerOrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SellerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    businessName?: SortOrder
    website?: SortOrder
    category?: SortOrder
    subcategories?: SortOrder
    businessAddress?: SortOrder
    businessCity?: SortOrder
    businessState?: SortOrder
    businessPincode?: SortOrder
    businessArea?: SortOrder
    businessLocality?: SortOrder
    businessDescription?: SortOrder
    businessImage?: SortOrder
    openingHours?: SortOrder
    isVerified?: SortOrder
    isPromoted?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    deliveryTime?: SortOrder
    isOpen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SellerAvgOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
  }

  export type SellerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    businessName?: SortOrder
    website?: SortOrder
    category?: SortOrder
    subcategories?: SortOrder
    businessAddress?: SortOrder
    businessCity?: SortOrder
    businessState?: SortOrder
    businessPincode?: SortOrder
    businessArea?: SortOrder
    businessLocality?: SortOrder
    businessDescription?: SortOrder
    businessImage?: SortOrder
    openingHours?: SortOrder
    isVerified?: SortOrder
    isPromoted?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    deliveryTime?: SortOrder
    isOpen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SellerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    businessName?: SortOrder
    website?: SortOrder
    category?: SortOrder
    subcategories?: SortOrder
    businessAddress?: SortOrder
    businessCity?: SortOrder
    businessState?: SortOrder
    businessPincode?: SortOrder
    businessArea?: SortOrder
    businessLocality?: SortOrder
    businessDescription?: SortOrder
    businessImage?: SortOrder
    openingHours?: SortOrder
    isVerified?: SortOrder
    isPromoted?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
    deliveryTime?: SortOrder
    isOpen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SellerSumOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    totalReviews?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DeliveryAgentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    vehicleNumber?: SortOrder
    vehicleType?: SortOrder
    isAvailable?: SortOrder
    currentLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryAgentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DeliveryAgentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    vehicleNumber?: SortOrder
    vehicleType?: SortOrder
    isAvailable?: SortOrder
    currentLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryAgentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    vehicleNumber?: SortOrder
    vehicleType?: SortOrder
    isAvailable?: SortOrder
    currentLocation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryAgentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SellerScalarRelationFilter = {
    is?: SellerWhereInput
    isNot?: SellerWhereInput
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    originalPrice?: SortOrder
    image?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    stock?: SortOrder
    inStock?: SortOrder
    isActive?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    originalPrice?: SortOrder
    stock?: SortOrder
    sellerId?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    originalPrice?: SortOrder
    image?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    stock?: SortOrder
    inStock?: SortOrder
    isActive?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    originalPrice?: SortOrder
    image?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    stock?: SortOrder
    inStock?: SortOrder
    isActive?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    originalPrice?: SortOrder
    stock?: SortOrder
    sellerId?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[]
    notIn?: $Enums.PaymentMethod[]
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[]
    notIn?: $Enums.PaymentStatus[]
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type DeliveryAgentNullableScalarRelationFilter = {
    is?: DeliveryAgentWhereInput | null
    isNot?: DeliveryAgentWhereInput | null
  }

  export type OrderTrackingListRelationFilter = {
    every?: OrderTrackingWhereInput
    some?: OrderTrackingWhereInput
    none?: OrderTrackingWhereInput
  }

  export type OrderTrackingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    deliveryAgentId?: SortOrder
    orderStatus?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerAddress?: SortOrder
    customerCity?: SortOrder
    customerArea?: SortOrder
    customerLocality?: SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    deliveryInstructions?: SortOrder
    estimatedDeliveryTime?: SortOrder
    actualDeliveryTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    deliveryAgentId?: SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    deliveryAgentId?: SortOrder
    orderStatus?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerAddress?: SortOrder
    customerCity?: SortOrder
    customerArea?: SortOrder
    customerLocality?: SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    deliveryInstructions?: SortOrder
    estimatedDeliveryTime?: SortOrder
    actualDeliveryTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    deliveryAgentId?: SortOrder
    orderStatus?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerAddress?: SortOrder
    customerCity?: SortOrder
    customerArea?: SortOrder
    customerLocality?: SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    deliveryInstructions?: SortOrder
    estimatedDeliveryTime?: SortOrder
    actualDeliveryTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    deliveryAgentId?: SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    taxAmount?: SortOrder
    totalAmount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[]
    notIn?: $Enums.PaymentMethod[]
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[]
    notIn?: $Enums.PaymentStatus[]
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    productName?: SortOrder
    productImage?: SortOrder
    productCategory?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    productName?: SortOrder
    productImage?: SortOrder
    productCategory?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    productName?: SortOrder
    productImage?: SortOrder
    productCategory?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SellerOrderOrderIdSellerIdCompoundUniqueInput = {
    orderId: number
    sellerId: number
  }

  export type SellerOrderCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    sellerId?: SortOrder
    status?: SortOrder
    items?: SortOrder
    subtotal?: SortOrder
    commission?: SortOrder
    netAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SellerOrderAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    sellerId?: SortOrder
    subtotal?: SortOrder
    commission?: SortOrder
    netAmount?: SortOrder
  }

  export type SellerOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    sellerId?: SortOrder
    status?: SortOrder
    subtotal?: SortOrder
    commission?: SortOrder
    netAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SellerOrderMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    sellerId?: SortOrder
    status?: SortOrder
    subtotal?: SortOrder
    commission?: SortOrder
    netAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SellerOrderSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    sellerId?: SortOrder
    subtotal?: SortOrder
    commission?: SortOrder
    netAmount?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    orderId?: SortOrder
    customerId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    transactionId?: SortOrder
    gateway?: SortOrder
    gatewayResponse?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    customerId?: SortOrder
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    orderId?: SortOrder
    customerId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    transactionId?: SortOrder
    gateway?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    orderId?: SortOrder
    customerId?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    transactionId?: SortOrder
    gateway?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    customerId?: SortOrder
    amount?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumTrackingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TrackingStatus | EnumTrackingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TrackingStatus[]
    notIn?: $Enums.TrackingStatus[]
    not?: NestedEnumTrackingStatusFilter<$PrismaModel> | $Enums.TrackingStatus
  }

  export type OrderTrackingCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    description?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderTrackingAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
  }

  export type OrderTrackingMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    description?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderTrackingMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    description?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderTrackingSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
  }

  export type EnumTrackingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrackingStatus | EnumTrackingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TrackingStatus[]
    notIn?: $Enums.TrackingStatus[]
    not?: NestedEnumTrackingStatusWithAggregatesFilter<$PrismaModel> | $Enums.TrackingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTrackingStatusFilter<$PrismaModel>
    _max?: NestedEnumTrackingStatusFilter<$PrismaModel>
  }

  export type ChatMessageCountOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    senderType?: SortOrder
    receiverId?: SortOrder
    receiverType?: SortOrder
    message?: SortOrder
    orderId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
  }

  export type ChatMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    senderType?: SortOrder
    receiverId?: SortOrder
    receiverType?: SortOrder
    message?: SortOrder
    orderId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageMinOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    senderType?: SortOrder
    receiverId?: SortOrder
    receiverType?: SortOrder
    message?: SortOrder
    orderId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
  }

  export type OrderCreateNestedManyWithoutCustomerInput = {
    create?: XOR<OrderCreateWithoutCustomerInput, OrderUncheckedCreateWithoutCustomerInput> | OrderCreateWithoutCustomerInput[] | OrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCustomerInput | OrderCreateOrConnectWithoutCustomerInput[]
    createMany?: OrderCreateManyCustomerInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutCustomerInput = {
    create?: XOR<PaymentCreateWithoutCustomerInput, PaymentUncheckedCreateWithoutCustomerInput> | PaymentCreateWithoutCustomerInput[] | PaymentUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCustomerInput | PaymentCreateOrConnectWithoutCustomerInput[]
    createMany?: PaymentCreateManyCustomerInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<OrderCreateWithoutCustomerInput, OrderUncheckedCreateWithoutCustomerInput> | OrderCreateWithoutCustomerInput[] | OrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCustomerInput | OrderCreateOrConnectWithoutCustomerInput[]
    createMany?: OrderCreateManyCustomerInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<PaymentCreateWithoutCustomerInput, PaymentUncheckedCreateWithoutCustomerInput> | PaymentCreateWithoutCustomerInput[] | PaymentUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCustomerInput | PaymentCreateOrConnectWithoutCustomerInput[]
    createMany?: PaymentCreateManyCustomerInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrderUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<OrderCreateWithoutCustomerInput, OrderUncheckedCreateWithoutCustomerInput> | OrderCreateWithoutCustomerInput[] | OrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCustomerInput | OrderCreateOrConnectWithoutCustomerInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutCustomerInput | OrderUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: OrderCreateManyCustomerInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutCustomerInput | OrderUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutCustomerInput | OrderUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<PaymentCreateWithoutCustomerInput, PaymentUncheckedCreateWithoutCustomerInput> | PaymentCreateWithoutCustomerInput[] | PaymentUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCustomerInput | PaymentCreateOrConnectWithoutCustomerInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutCustomerInput | PaymentUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: PaymentCreateManyCustomerInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutCustomerInput | PaymentUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutCustomerInput | PaymentUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<OrderCreateWithoutCustomerInput, OrderUncheckedCreateWithoutCustomerInput> | OrderCreateWithoutCustomerInput[] | OrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCustomerInput | OrderCreateOrConnectWithoutCustomerInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutCustomerInput | OrderUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: OrderCreateManyCustomerInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutCustomerInput | OrderUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutCustomerInput | OrderUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<PaymentCreateWithoutCustomerInput, PaymentUncheckedCreateWithoutCustomerInput> | PaymentCreateWithoutCustomerInput[] | PaymentUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCustomerInput | PaymentCreateOrConnectWithoutCustomerInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutCustomerInput | PaymentUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: PaymentCreateManyCustomerInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutCustomerInput | PaymentUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutCustomerInput | PaymentUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutSellerInput = {
    create?: XOR<ProductCreateWithoutSellerInput, ProductUncheckedCreateWithoutSellerInput> | ProductCreateWithoutSellerInput[] | ProductUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSellerInput | ProductCreateOrConnectWithoutSellerInput[]
    createMany?: ProductCreateManySellerInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type SellerOrderCreateNestedManyWithoutSellerInput = {
    create?: XOR<SellerOrderCreateWithoutSellerInput, SellerOrderUncheckedCreateWithoutSellerInput> | SellerOrderCreateWithoutSellerInput[] | SellerOrderUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: SellerOrderCreateOrConnectWithoutSellerInput | SellerOrderCreateOrConnectWithoutSellerInput[]
    createMany?: SellerOrderCreateManySellerInputEnvelope
    connect?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutSellerInput = {
    create?: XOR<ProductCreateWithoutSellerInput, ProductUncheckedCreateWithoutSellerInput> | ProductCreateWithoutSellerInput[] | ProductUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSellerInput | ProductCreateOrConnectWithoutSellerInput[]
    createMany?: ProductCreateManySellerInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type SellerOrderUncheckedCreateNestedManyWithoutSellerInput = {
    create?: XOR<SellerOrderCreateWithoutSellerInput, SellerOrderUncheckedCreateWithoutSellerInput> | SellerOrderCreateWithoutSellerInput[] | SellerOrderUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: SellerOrderCreateOrConnectWithoutSellerInput | SellerOrderCreateOrConnectWithoutSellerInput[]
    createMany?: SellerOrderCreateManySellerInputEnvelope
    connect?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUpdateManyWithoutSellerNestedInput = {
    create?: XOR<ProductCreateWithoutSellerInput, ProductUncheckedCreateWithoutSellerInput> | ProductCreateWithoutSellerInput[] | ProductUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSellerInput | ProductCreateOrConnectWithoutSellerInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutSellerInput | ProductUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: ProductCreateManySellerInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutSellerInput | ProductUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutSellerInput | ProductUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type SellerOrderUpdateManyWithoutSellerNestedInput = {
    create?: XOR<SellerOrderCreateWithoutSellerInput, SellerOrderUncheckedCreateWithoutSellerInput> | SellerOrderCreateWithoutSellerInput[] | SellerOrderUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: SellerOrderCreateOrConnectWithoutSellerInput | SellerOrderCreateOrConnectWithoutSellerInput[]
    upsert?: SellerOrderUpsertWithWhereUniqueWithoutSellerInput | SellerOrderUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: SellerOrderCreateManySellerInputEnvelope
    set?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    disconnect?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    delete?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    connect?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    update?: SellerOrderUpdateWithWhereUniqueWithoutSellerInput | SellerOrderUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: SellerOrderUpdateManyWithWhereWithoutSellerInput | SellerOrderUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: SellerOrderScalarWhereInput | SellerOrderScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutSellerNestedInput = {
    create?: XOR<ProductCreateWithoutSellerInput, ProductUncheckedCreateWithoutSellerInput> | ProductCreateWithoutSellerInput[] | ProductUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSellerInput | ProductCreateOrConnectWithoutSellerInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutSellerInput | ProductUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: ProductCreateManySellerInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutSellerInput | ProductUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutSellerInput | ProductUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type SellerOrderUncheckedUpdateManyWithoutSellerNestedInput = {
    create?: XOR<SellerOrderCreateWithoutSellerInput, SellerOrderUncheckedCreateWithoutSellerInput> | SellerOrderCreateWithoutSellerInput[] | SellerOrderUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: SellerOrderCreateOrConnectWithoutSellerInput | SellerOrderCreateOrConnectWithoutSellerInput[]
    upsert?: SellerOrderUpsertWithWhereUniqueWithoutSellerInput | SellerOrderUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: SellerOrderCreateManySellerInputEnvelope
    set?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    disconnect?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    delete?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    connect?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    update?: SellerOrderUpdateWithWhereUniqueWithoutSellerInput | SellerOrderUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: SellerOrderUpdateManyWithWhereWithoutSellerInput | SellerOrderUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: SellerOrderScalarWhereInput | SellerOrderScalarWhereInput[]
  }

  export type OrderCreateNestedManyWithoutDeliveryAgentInput = {
    create?: XOR<OrderCreateWithoutDeliveryAgentInput, OrderUncheckedCreateWithoutDeliveryAgentInput> | OrderCreateWithoutDeliveryAgentInput[] | OrderUncheckedCreateWithoutDeliveryAgentInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDeliveryAgentInput | OrderCreateOrConnectWithoutDeliveryAgentInput[]
    createMany?: OrderCreateManyDeliveryAgentInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutDeliveryAgentInput = {
    create?: XOR<OrderCreateWithoutDeliveryAgentInput, OrderUncheckedCreateWithoutDeliveryAgentInput> | OrderCreateWithoutDeliveryAgentInput[] | OrderUncheckedCreateWithoutDeliveryAgentInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDeliveryAgentInput | OrderCreateOrConnectWithoutDeliveryAgentInput[]
    createMany?: OrderCreateManyDeliveryAgentInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUpdateManyWithoutDeliveryAgentNestedInput = {
    create?: XOR<OrderCreateWithoutDeliveryAgentInput, OrderUncheckedCreateWithoutDeliveryAgentInput> | OrderCreateWithoutDeliveryAgentInput[] | OrderUncheckedCreateWithoutDeliveryAgentInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDeliveryAgentInput | OrderCreateOrConnectWithoutDeliveryAgentInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutDeliveryAgentInput | OrderUpsertWithWhereUniqueWithoutDeliveryAgentInput[]
    createMany?: OrderCreateManyDeliveryAgentInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutDeliveryAgentInput | OrderUpdateWithWhereUniqueWithoutDeliveryAgentInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutDeliveryAgentInput | OrderUpdateManyWithWhereWithoutDeliveryAgentInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutDeliveryAgentNestedInput = {
    create?: XOR<OrderCreateWithoutDeliveryAgentInput, OrderUncheckedCreateWithoutDeliveryAgentInput> | OrderCreateWithoutDeliveryAgentInput[] | OrderUncheckedCreateWithoutDeliveryAgentInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDeliveryAgentInput | OrderCreateOrConnectWithoutDeliveryAgentInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutDeliveryAgentInput | OrderUpsertWithWhereUniqueWithoutDeliveryAgentInput[]
    createMany?: OrderCreateManyDeliveryAgentInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutDeliveryAgentInput | OrderUpdateWithWhereUniqueWithoutDeliveryAgentInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutDeliveryAgentInput | OrderUpdateManyWithWhereWithoutDeliveryAgentInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type SellerCreateNestedOneWithoutProductsInput = {
    create?: XOR<SellerCreateWithoutProductsInput, SellerUncheckedCreateWithoutProductsInput>
    connectOrCreate?: SellerCreateOrConnectWithoutProductsInput
    connect?: SellerWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SellerUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<SellerCreateWithoutProductsInput, SellerUncheckedCreateWithoutProductsInput>
    connectOrCreate?: SellerCreateOrConnectWithoutProductsInput
    upsert?: SellerUpsertWithoutProductsInput
    connect?: SellerWhereUniqueInput
    update?: XOR<XOR<SellerUpdateToOneWithWhereWithoutProductsInput, SellerUpdateWithoutProductsInput>, SellerUncheckedUpdateWithoutProductsInput>
  }

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutOrdersInput = {
    create?: XOR<CustomerCreateWithoutOrdersInput, CustomerUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutOrdersInput
    connect?: CustomerWhereUniqueInput
  }

  export type DeliveryAgentCreateNestedOneWithoutDeliveryOrdersInput = {
    create?: XOR<DeliveryAgentCreateWithoutDeliveryOrdersInput, DeliveryAgentUncheckedCreateWithoutDeliveryOrdersInput>
    connectOrCreate?: DeliveryAgentCreateOrConnectWithoutDeliveryOrdersInput
    connect?: DeliveryAgentWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type SellerOrderCreateNestedManyWithoutOrderInput = {
    create?: XOR<SellerOrderCreateWithoutOrderInput, SellerOrderUncheckedCreateWithoutOrderInput> | SellerOrderCreateWithoutOrderInput[] | SellerOrderUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: SellerOrderCreateOrConnectWithoutOrderInput | SellerOrderCreateOrConnectWithoutOrderInput[]
    createMany?: SellerOrderCreateManyOrderInputEnvelope
    connect?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutOrderInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput> | PaymentCreateWithoutOrderInput[] | PaymentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput | PaymentCreateOrConnectWithoutOrderInput[]
    createMany?: PaymentCreateManyOrderInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type OrderTrackingCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderTrackingCreateWithoutOrderInput, OrderTrackingUncheckedCreateWithoutOrderInput> | OrderTrackingCreateWithoutOrderInput[] | OrderTrackingUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderTrackingCreateOrConnectWithoutOrderInput | OrderTrackingCreateOrConnectWithoutOrderInput[]
    createMany?: OrderTrackingCreateManyOrderInputEnvelope
    connect?: OrderTrackingWhereUniqueInput | OrderTrackingWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type SellerOrderUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<SellerOrderCreateWithoutOrderInput, SellerOrderUncheckedCreateWithoutOrderInput> | SellerOrderCreateWithoutOrderInput[] | SellerOrderUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: SellerOrderCreateOrConnectWithoutOrderInput | SellerOrderCreateOrConnectWithoutOrderInput[]
    createMany?: SellerOrderCreateManyOrderInputEnvelope
    connect?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput> | PaymentCreateWithoutOrderInput[] | PaymentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput | PaymentCreateOrConnectWithoutOrderInput[]
    createMany?: PaymentCreateManyOrderInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type OrderTrackingUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderTrackingCreateWithoutOrderInput, OrderTrackingUncheckedCreateWithoutOrderInput> | OrderTrackingCreateWithoutOrderInput[] | OrderTrackingUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderTrackingCreateOrConnectWithoutOrderInput | OrderTrackingCreateOrConnectWithoutOrderInput[]
    createMany?: OrderTrackingCreateManyOrderInputEnvelope
    connect?: OrderTrackingWhereUniqueInput | OrderTrackingWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CustomerUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<CustomerCreateWithoutOrdersInput, CustomerUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutOrdersInput
    upsert?: CustomerUpsertWithoutOrdersInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutOrdersInput, CustomerUpdateWithoutOrdersInput>, CustomerUncheckedUpdateWithoutOrdersInput>
  }

  export type DeliveryAgentUpdateOneWithoutDeliveryOrdersNestedInput = {
    create?: XOR<DeliveryAgentCreateWithoutDeliveryOrdersInput, DeliveryAgentUncheckedCreateWithoutDeliveryOrdersInput>
    connectOrCreate?: DeliveryAgentCreateOrConnectWithoutDeliveryOrdersInput
    upsert?: DeliveryAgentUpsertWithoutDeliveryOrdersInput
    disconnect?: DeliveryAgentWhereInput | boolean
    delete?: DeliveryAgentWhereInput | boolean
    connect?: DeliveryAgentWhereUniqueInput
    update?: XOR<XOR<DeliveryAgentUpdateToOneWithWhereWithoutDeliveryOrdersInput, DeliveryAgentUpdateWithoutDeliveryOrdersInput>, DeliveryAgentUncheckedUpdateWithoutDeliveryOrdersInput>
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type SellerOrderUpdateManyWithoutOrderNestedInput = {
    create?: XOR<SellerOrderCreateWithoutOrderInput, SellerOrderUncheckedCreateWithoutOrderInput> | SellerOrderCreateWithoutOrderInput[] | SellerOrderUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: SellerOrderCreateOrConnectWithoutOrderInput | SellerOrderCreateOrConnectWithoutOrderInput[]
    upsert?: SellerOrderUpsertWithWhereUniqueWithoutOrderInput | SellerOrderUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: SellerOrderCreateManyOrderInputEnvelope
    set?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    disconnect?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    delete?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    connect?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    update?: SellerOrderUpdateWithWhereUniqueWithoutOrderInput | SellerOrderUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: SellerOrderUpdateManyWithWhereWithoutOrderInput | SellerOrderUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: SellerOrderScalarWhereInput | SellerOrderScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutOrderNestedInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput> | PaymentCreateWithoutOrderInput[] | PaymentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput | PaymentCreateOrConnectWithoutOrderInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutOrderInput | PaymentUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: PaymentCreateManyOrderInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutOrderInput | PaymentUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutOrderInput | PaymentUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type OrderTrackingUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderTrackingCreateWithoutOrderInput, OrderTrackingUncheckedCreateWithoutOrderInput> | OrderTrackingCreateWithoutOrderInput[] | OrderTrackingUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderTrackingCreateOrConnectWithoutOrderInput | OrderTrackingCreateOrConnectWithoutOrderInput[]
    upsert?: OrderTrackingUpsertWithWhereUniqueWithoutOrderInput | OrderTrackingUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderTrackingCreateManyOrderInputEnvelope
    set?: OrderTrackingWhereUniqueInput | OrderTrackingWhereUniqueInput[]
    disconnect?: OrderTrackingWhereUniqueInput | OrderTrackingWhereUniqueInput[]
    delete?: OrderTrackingWhereUniqueInput | OrderTrackingWhereUniqueInput[]
    connect?: OrderTrackingWhereUniqueInput | OrderTrackingWhereUniqueInput[]
    update?: OrderTrackingUpdateWithWhereUniqueWithoutOrderInput | OrderTrackingUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderTrackingUpdateManyWithWhereWithoutOrderInput | OrderTrackingUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderTrackingScalarWhereInput | OrderTrackingScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type SellerOrderUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<SellerOrderCreateWithoutOrderInput, SellerOrderUncheckedCreateWithoutOrderInput> | SellerOrderCreateWithoutOrderInput[] | SellerOrderUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: SellerOrderCreateOrConnectWithoutOrderInput | SellerOrderCreateOrConnectWithoutOrderInput[]
    upsert?: SellerOrderUpsertWithWhereUniqueWithoutOrderInput | SellerOrderUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: SellerOrderCreateManyOrderInputEnvelope
    set?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    disconnect?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    delete?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    connect?: SellerOrderWhereUniqueInput | SellerOrderWhereUniqueInput[]
    update?: SellerOrderUpdateWithWhereUniqueWithoutOrderInput | SellerOrderUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: SellerOrderUpdateManyWithWhereWithoutOrderInput | SellerOrderUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: SellerOrderScalarWhereInput | SellerOrderScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput> | PaymentCreateWithoutOrderInput[] | PaymentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput | PaymentCreateOrConnectWithoutOrderInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutOrderInput | PaymentUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: PaymentCreateManyOrderInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutOrderInput | PaymentUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutOrderInput | PaymentUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type OrderTrackingUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderTrackingCreateWithoutOrderInput, OrderTrackingUncheckedCreateWithoutOrderInput> | OrderTrackingCreateWithoutOrderInput[] | OrderTrackingUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderTrackingCreateOrConnectWithoutOrderInput | OrderTrackingCreateOrConnectWithoutOrderInput[]
    upsert?: OrderTrackingUpsertWithWhereUniqueWithoutOrderInput | OrderTrackingUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderTrackingCreateManyOrderInputEnvelope
    set?: OrderTrackingWhereUniqueInput | OrderTrackingWhereUniqueInput[]
    disconnect?: OrderTrackingWhereUniqueInput | OrderTrackingWhereUniqueInput[]
    delete?: OrderTrackingWhereUniqueInput | OrderTrackingWhereUniqueInput[]
    connect?: OrderTrackingWhereUniqueInput | OrderTrackingWhereUniqueInput[]
    update?: OrderTrackingUpdateWithWhereUniqueWithoutOrderInput | OrderTrackingUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderTrackingUpdateManyWithWhereWithoutOrderInput | OrderTrackingUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderTrackingScalarWhereInput | OrderTrackingScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    upsert?: ProductUpsertWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrderItemsInput, ProductUpdateWithoutOrderItemsInput>, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type OrderCreateNestedOneWithoutSellerOrdersInput = {
    create?: XOR<OrderCreateWithoutSellerOrdersInput, OrderUncheckedCreateWithoutSellerOrdersInput>
    connectOrCreate?: OrderCreateOrConnectWithoutSellerOrdersInput
    connect?: OrderWhereUniqueInput
  }

  export type SellerCreateNestedOneWithoutSellerOrdersInput = {
    create?: XOR<SellerCreateWithoutSellerOrdersInput, SellerUncheckedCreateWithoutSellerOrdersInput>
    connectOrCreate?: SellerCreateOrConnectWithoutSellerOrdersInput
    connect?: SellerWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutSellerOrdersNestedInput = {
    create?: XOR<OrderCreateWithoutSellerOrdersInput, OrderUncheckedCreateWithoutSellerOrdersInput>
    connectOrCreate?: OrderCreateOrConnectWithoutSellerOrdersInput
    upsert?: OrderUpsertWithoutSellerOrdersInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutSellerOrdersInput, OrderUpdateWithoutSellerOrdersInput>, OrderUncheckedUpdateWithoutSellerOrdersInput>
  }

  export type SellerUpdateOneRequiredWithoutSellerOrdersNestedInput = {
    create?: XOR<SellerCreateWithoutSellerOrdersInput, SellerUncheckedCreateWithoutSellerOrdersInput>
    connectOrCreate?: SellerCreateOrConnectWithoutSellerOrdersInput
    upsert?: SellerUpsertWithoutSellerOrdersInput
    connect?: SellerWhereUniqueInput
    update?: XOR<XOR<SellerUpdateToOneWithWhereWithoutSellerOrdersInput, SellerUpdateWithoutSellerOrdersInput>, SellerUncheckedUpdateWithoutSellerOrdersInput>
  }

  export type OrderCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPaymentsInput
    connect?: OrderWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<CustomerCreateWithoutPaymentsInput, CustomerUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPaymentsInput
    connect?: CustomerWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPaymentsInput
    upsert?: OrderUpsertWithoutPaymentsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutPaymentsInput, OrderUpdateWithoutPaymentsInput>, OrderUncheckedUpdateWithoutPaymentsInput>
  }

  export type CustomerUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<CustomerCreateWithoutPaymentsInput, CustomerUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPaymentsInput
    upsert?: CustomerUpsertWithoutPaymentsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutPaymentsInput, CustomerUpdateWithoutPaymentsInput>, CustomerUncheckedUpdateWithoutPaymentsInput>
  }

  export type OrderCreateNestedOneWithoutTrackingInput = {
    create?: XOR<OrderCreateWithoutTrackingInput, OrderUncheckedCreateWithoutTrackingInput>
    connectOrCreate?: OrderCreateOrConnectWithoutTrackingInput
    connect?: OrderWhereUniqueInput
  }

  export type EnumTrackingStatusFieldUpdateOperationsInput = {
    set?: $Enums.TrackingStatus
  }

  export type OrderUpdateOneRequiredWithoutTrackingNestedInput = {
    create?: XOR<OrderCreateWithoutTrackingInput, OrderUncheckedCreateWithoutTrackingInput>
    connectOrCreate?: OrderCreateOrConnectWithoutTrackingInput
    upsert?: OrderUpsertWithoutTrackingInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutTrackingInput, OrderUpdateWithoutTrackingInput>, OrderUncheckedUpdateWithoutTrackingInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[]
    notIn?: $Enums.PaymentMethod[]
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[]
    notIn?: $Enums.PaymentStatus[]
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[]
    notIn?: $Enums.PaymentMethod[]
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[]
    notIn?: $Enums.PaymentStatus[]
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTrackingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TrackingStatus | EnumTrackingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TrackingStatus[]
    notIn?: $Enums.TrackingStatus[]
    not?: NestedEnumTrackingStatusFilter<$PrismaModel> | $Enums.TrackingStatus
  }

  export type NestedEnumTrackingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrackingStatus | EnumTrackingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TrackingStatus[]
    notIn?: $Enums.TrackingStatus[]
    not?: NestedEnumTrackingStatusWithAggregatesFilter<$PrismaModel> | $Enums.TrackingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTrackingStatusFilter<$PrismaModel>
    _max?: NestedEnumTrackingStatusFilter<$PrismaModel>
  }

  export type OrderCreateWithoutCustomerInput = {
    orderNumber: string
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveryAgent?: DeliveryAgentCreateNestedOneWithoutDeliveryOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    sellerOrders?: SellerOrderCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
    tracking?: OrderTrackingCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutCustomerInput = {
    id?: number
    orderNumber: string
    deliveryAgentId?: number | null
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    sellerOrders?: SellerOrderUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
    tracking?: OrderTrackingUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutCustomerInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutCustomerInput, OrderUncheckedCreateWithoutCustomerInput>
  }

  export type OrderCreateManyCustomerInputEnvelope = {
    data: OrderCreateManyCustomerInput | OrderCreateManyCustomerInput[]
  }

  export type PaymentCreateWithoutCustomerInput = {
    paymentId: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    transactionId?: string | null
    gateway?: string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutCustomerInput = {
    id?: number
    paymentId: string
    orderId: number
    amount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    transactionId?: string | null
    gateway?: string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutCustomerInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutCustomerInput, PaymentUncheckedCreateWithoutCustomerInput>
  }

  export type PaymentCreateManyCustomerInputEnvelope = {
    data: PaymentCreateManyCustomerInput | PaymentCreateManyCustomerInput[]
  }

  export type OrderUpsertWithWhereUniqueWithoutCustomerInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutCustomerInput, OrderUncheckedUpdateWithoutCustomerInput>
    create: XOR<OrderCreateWithoutCustomerInput, OrderUncheckedCreateWithoutCustomerInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutCustomerInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutCustomerInput, OrderUncheckedUpdateWithoutCustomerInput>
  }

  export type OrderUpdateManyWithWhereWithoutCustomerInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutCustomerInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: IntFilter<"Order"> | number
    orderNumber?: StringFilter<"Order"> | string
    customerId?: IntFilter<"Order"> | number
    deliveryAgentId?: IntNullableFilter<"Order"> | number | null
    orderStatus?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    customerName?: StringFilter<"Order"> | string
    customerPhone?: StringFilter<"Order"> | string
    customerAddress?: StringFilter<"Order"> | string
    customerCity?: StringFilter<"Order"> | string
    customerArea?: StringFilter<"Order"> | string
    customerLocality?: StringNullableFilter<"Order"> | string | null
    subtotal?: FloatFilter<"Order"> | number
    deliveryFee?: FloatFilter<"Order"> | number
    taxAmount?: FloatFilter<"Order"> | number
    totalAmount?: FloatFilter<"Order"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Order"> | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFilter<"Order"> | $Enums.PaymentStatus
    deliveryInstructions?: StringNullableFilter<"Order"> | string | null
    estimatedDeliveryTime?: DateTimeNullableFilter<"Order"> | Date | string | null
    actualDeliveryTime?: DateTimeNullableFilter<"Order"> | Date | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutCustomerInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutCustomerInput, PaymentUncheckedUpdateWithoutCustomerInput>
    create: XOR<PaymentCreateWithoutCustomerInput, PaymentUncheckedCreateWithoutCustomerInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutCustomerInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutCustomerInput, PaymentUncheckedUpdateWithoutCustomerInput>
  }

  export type PaymentUpdateManyWithWhereWithoutCustomerInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutCustomerInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: IntFilter<"Payment"> | number
    paymentId?: StringFilter<"Payment"> | string
    orderId?: IntFilter<"Payment"> | number
    customerId?: IntFilter<"Payment"> | number
    amount?: FloatFilter<"Payment"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    transactionId?: StringNullableFilter<"Payment"> | string | null
    gateway?: StringNullableFilter<"Payment"> | string | null
    gatewayResponse?: JsonNullableFilter<"Payment">
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type ProductCreateWithoutSellerInput = {
    name: string
    description?: string | null
    price: number
    originalPrice?: number | null
    image?: string | null
    category?: string | null
    subcategory?: string | null
    stock?: number
    inStock?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSellerInput = {
    id?: number
    name: string
    description?: string | null
    price: number
    originalPrice?: number | null
    image?: string | null
    category?: string | null
    subcategory?: string | null
    stock?: number
    inStock?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSellerInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSellerInput, ProductUncheckedCreateWithoutSellerInput>
  }

  export type ProductCreateManySellerInputEnvelope = {
    data: ProductCreateManySellerInput | ProductCreateManySellerInput[]
  }

  export type SellerOrderCreateWithoutSellerInput = {
    status?: $Enums.OrderStatus
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    commission?: number
    netAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutSellerOrdersInput
  }

  export type SellerOrderUncheckedCreateWithoutSellerInput = {
    id?: number
    orderId: number
    status?: $Enums.OrderStatus
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    commission?: number
    netAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SellerOrderCreateOrConnectWithoutSellerInput = {
    where: SellerOrderWhereUniqueInput
    create: XOR<SellerOrderCreateWithoutSellerInput, SellerOrderUncheckedCreateWithoutSellerInput>
  }

  export type SellerOrderCreateManySellerInputEnvelope = {
    data: SellerOrderCreateManySellerInput | SellerOrderCreateManySellerInput[]
  }

  export type ProductUpsertWithWhereUniqueWithoutSellerInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutSellerInput, ProductUncheckedUpdateWithoutSellerInput>
    create: XOR<ProductCreateWithoutSellerInput, ProductUncheckedCreateWithoutSellerInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutSellerInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutSellerInput, ProductUncheckedUpdateWithoutSellerInput>
  }

  export type ProductUpdateManyWithWhereWithoutSellerInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutSellerInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatFilter<"Product"> | number
    originalPrice?: FloatNullableFilter<"Product"> | number | null
    image?: StringNullableFilter<"Product"> | string | null
    category?: StringNullableFilter<"Product"> | string | null
    subcategory?: StringNullableFilter<"Product"> | string | null
    stock?: IntFilter<"Product"> | number
    inStock?: BoolFilter<"Product"> | boolean
    isActive?: BoolFilter<"Product"> | boolean
    sellerId?: IntFilter<"Product"> | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type SellerOrderUpsertWithWhereUniqueWithoutSellerInput = {
    where: SellerOrderWhereUniqueInput
    update: XOR<SellerOrderUpdateWithoutSellerInput, SellerOrderUncheckedUpdateWithoutSellerInput>
    create: XOR<SellerOrderCreateWithoutSellerInput, SellerOrderUncheckedCreateWithoutSellerInput>
  }

  export type SellerOrderUpdateWithWhereUniqueWithoutSellerInput = {
    where: SellerOrderWhereUniqueInput
    data: XOR<SellerOrderUpdateWithoutSellerInput, SellerOrderUncheckedUpdateWithoutSellerInput>
  }

  export type SellerOrderUpdateManyWithWhereWithoutSellerInput = {
    where: SellerOrderScalarWhereInput
    data: XOR<SellerOrderUpdateManyMutationInput, SellerOrderUncheckedUpdateManyWithoutSellerInput>
  }

  export type SellerOrderScalarWhereInput = {
    AND?: SellerOrderScalarWhereInput | SellerOrderScalarWhereInput[]
    OR?: SellerOrderScalarWhereInput[]
    NOT?: SellerOrderScalarWhereInput | SellerOrderScalarWhereInput[]
    id?: IntFilter<"SellerOrder"> | number
    orderId?: IntFilter<"SellerOrder"> | number
    sellerId?: IntFilter<"SellerOrder"> | number
    status?: EnumOrderStatusFilter<"SellerOrder"> | $Enums.OrderStatus
    items?: JsonFilter<"SellerOrder">
    subtotal?: FloatFilter<"SellerOrder"> | number
    commission?: FloatFilter<"SellerOrder"> | number
    netAmount?: FloatFilter<"SellerOrder"> | number
    createdAt?: DateTimeFilter<"SellerOrder"> | Date | string
    updatedAt?: DateTimeFilter<"SellerOrder"> | Date | string
  }

  export type OrderCreateWithoutDeliveryAgentInput = {
    orderNumber: string
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    sellerOrders?: SellerOrderCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
    tracking?: OrderTrackingCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutDeliveryAgentInput = {
    id?: number
    orderNumber: string
    customerId: number
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    sellerOrders?: SellerOrderUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
    tracking?: OrderTrackingUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutDeliveryAgentInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutDeliveryAgentInput, OrderUncheckedCreateWithoutDeliveryAgentInput>
  }

  export type OrderCreateManyDeliveryAgentInputEnvelope = {
    data: OrderCreateManyDeliveryAgentInput | OrderCreateManyDeliveryAgentInput[]
  }

  export type OrderUpsertWithWhereUniqueWithoutDeliveryAgentInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutDeliveryAgentInput, OrderUncheckedUpdateWithoutDeliveryAgentInput>
    create: XOR<OrderCreateWithoutDeliveryAgentInput, OrderUncheckedCreateWithoutDeliveryAgentInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutDeliveryAgentInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutDeliveryAgentInput, OrderUncheckedUpdateWithoutDeliveryAgentInput>
  }

  export type OrderUpdateManyWithWhereWithoutDeliveryAgentInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutDeliveryAgentInput>
  }

  export type SellerCreateWithoutProductsInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    businessName: string
    website?: string | null
    category: string
    subcategories: string
    businessAddress: string
    businessCity: string
    businessState: string
    businessPincode: string
    businessArea?: string | null
    businessLocality?: string | null
    businessDescription?: string | null
    businessImage?: string | null
    openingHours?: string | null
    isVerified?: boolean
    isPromoted?: boolean
    rating?: number
    totalReviews?: number
    deliveryTime?: string | null
    isOpen?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sellerOrders?: SellerOrderCreateNestedManyWithoutSellerInput
  }

  export type SellerUncheckedCreateWithoutProductsInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    businessName: string
    website?: string | null
    category: string
    subcategories: string
    businessAddress: string
    businessCity: string
    businessState: string
    businessPincode: string
    businessArea?: string | null
    businessLocality?: string | null
    businessDescription?: string | null
    businessImage?: string | null
    openingHours?: string | null
    isVerified?: boolean
    isPromoted?: boolean
    rating?: number
    totalReviews?: number
    deliveryTime?: string | null
    isOpen?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sellerOrders?: SellerOrderUncheckedCreateNestedManyWithoutSellerInput
  }

  export type SellerCreateOrConnectWithoutProductsInput = {
    where: SellerWhereUniqueInput
    create: XOR<SellerCreateWithoutProductsInput, SellerUncheckedCreateWithoutProductsInput>
  }

  export type OrderItemCreateWithoutProductInput = {
    quantity: number
    unitPrice: number
    totalPrice: number
    productName: string
    productImage?: string | null
    productCategory?: string | null
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: number
    orderId: number
    quantity: number
    unitPrice: number
    totalPrice: number
    productName: string
    productImage?: string | null
    productCategory?: string | null
  }

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[]
  }

  export type SellerUpsertWithoutProductsInput = {
    update: XOR<SellerUpdateWithoutProductsInput, SellerUncheckedUpdateWithoutProductsInput>
    create: XOR<SellerCreateWithoutProductsInput, SellerUncheckedCreateWithoutProductsInput>
    where?: SellerWhereInput
  }

  export type SellerUpdateToOneWithWhereWithoutProductsInput = {
    where?: SellerWhereInput
    data: XOR<SellerUpdateWithoutProductsInput, SellerUncheckedUpdateWithoutProductsInput>
  }

  export type SellerUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    subcategories?: StringFieldUpdateOperationsInput | string
    businessAddress?: StringFieldUpdateOperationsInput | string
    businessCity?: StringFieldUpdateOperationsInput | string
    businessState?: StringFieldUpdateOperationsInput | string
    businessPincode?: StringFieldUpdateOperationsInput | string
    businessArea?: NullableStringFieldUpdateOperationsInput | string | null
    businessLocality?: NullableStringFieldUpdateOperationsInput | string | null
    businessDescription?: NullableStringFieldUpdateOperationsInput | string | null
    businessImage?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isPromoted?: BoolFieldUpdateOperationsInput | boolean
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    deliveryTime?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sellerOrders?: SellerOrderUpdateManyWithoutSellerNestedInput
  }

  export type SellerUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    subcategories?: StringFieldUpdateOperationsInput | string
    businessAddress?: StringFieldUpdateOperationsInput | string
    businessCity?: StringFieldUpdateOperationsInput | string
    businessState?: StringFieldUpdateOperationsInput | string
    businessPincode?: StringFieldUpdateOperationsInput | string
    businessArea?: NullableStringFieldUpdateOperationsInput | string | null
    businessLocality?: NullableStringFieldUpdateOperationsInput | string | null
    businessDescription?: NullableStringFieldUpdateOperationsInput | string | null
    businessImage?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isPromoted?: BoolFieldUpdateOperationsInput | boolean
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    deliveryTime?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sellerOrders?: SellerOrderUncheckedUpdateManyWithoutSellerNestedInput
  }

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: IntFilter<"OrderItem"> | number
    orderId?: IntFilter<"OrderItem"> | number
    productId?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    unitPrice?: FloatFilter<"OrderItem"> | number
    totalPrice?: FloatFilter<"OrderItem"> | number
    productName?: StringFilter<"OrderItem"> | string
    productImage?: StringNullableFilter<"OrderItem"> | string | null
    productCategory?: StringNullableFilter<"OrderItem"> | string | null
  }

  export type CustomerCreateWithoutOrdersInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutOrdersInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutOrdersInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutOrdersInput, CustomerUncheckedCreateWithoutOrdersInput>
  }

  export type DeliveryAgentCreateWithoutDeliveryOrdersInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    vehicleNumber: string
    vehicleType: string
    isAvailable?: boolean
    currentLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryAgentUncheckedCreateWithoutDeliveryOrdersInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    vehicleNumber: string
    vehicleType: string
    isAvailable?: boolean
    currentLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryAgentCreateOrConnectWithoutDeliveryOrdersInput = {
    where: DeliveryAgentWhereUniqueInput
    create: XOR<DeliveryAgentCreateWithoutDeliveryOrdersInput, DeliveryAgentUncheckedCreateWithoutDeliveryOrdersInput>
  }

  export type OrderItemCreateWithoutOrderInput = {
    quantity: number
    unitPrice: number
    totalPrice: number
    productName: string
    productImage?: string | null
    productCategory?: string | null
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: number
    productId: number
    quantity: number
    unitPrice: number
    totalPrice: number
    productName: string
    productImage?: string | null
    productCategory?: string | null
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
  }

  export type SellerOrderCreateWithoutOrderInput = {
    status?: $Enums.OrderStatus
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    commission?: number
    netAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    seller: SellerCreateNestedOneWithoutSellerOrdersInput
  }

  export type SellerOrderUncheckedCreateWithoutOrderInput = {
    id?: number
    sellerId: number
    status?: $Enums.OrderStatus
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    commission?: number
    netAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SellerOrderCreateOrConnectWithoutOrderInput = {
    where: SellerOrderWhereUniqueInput
    create: XOR<SellerOrderCreateWithoutOrderInput, SellerOrderUncheckedCreateWithoutOrderInput>
  }

  export type SellerOrderCreateManyOrderInputEnvelope = {
    data: SellerOrderCreateManyOrderInput | SellerOrderCreateManyOrderInput[]
  }

  export type PaymentCreateWithoutOrderInput = {
    paymentId: string
    amount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    transactionId?: string | null
    gateway?: string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutOrderInput = {
    id?: number
    paymentId: string
    customerId: number
    amount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    transactionId?: string | null
    gateway?: string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutOrderInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
  }

  export type PaymentCreateManyOrderInputEnvelope = {
    data: PaymentCreateManyOrderInput | PaymentCreateManyOrderInput[]
  }

  export type OrderTrackingCreateWithoutOrderInput = {
    status: $Enums.TrackingStatus
    description: string
    location?: string | null
    createdAt?: Date | string
  }

  export type OrderTrackingUncheckedCreateWithoutOrderInput = {
    id?: number
    status: $Enums.TrackingStatus
    description: string
    location?: string | null
    createdAt?: Date | string
  }

  export type OrderTrackingCreateOrConnectWithoutOrderInput = {
    where: OrderTrackingWhereUniqueInput
    create: XOR<OrderTrackingCreateWithoutOrderInput, OrderTrackingUncheckedCreateWithoutOrderInput>
  }

  export type OrderTrackingCreateManyOrderInputEnvelope = {
    data: OrderTrackingCreateManyOrderInput | OrderTrackingCreateManyOrderInput[]
  }

  export type CustomerUpsertWithoutOrdersInput = {
    update: XOR<CustomerUpdateWithoutOrdersInput, CustomerUncheckedUpdateWithoutOrdersInput>
    create: XOR<CustomerCreateWithoutOrdersInput, CustomerUncheckedCreateWithoutOrdersInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutOrdersInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutOrdersInput, CustomerUncheckedUpdateWithoutOrdersInput>
  }

  export type CustomerUpdateWithoutOrdersInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type DeliveryAgentUpsertWithoutDeliveryOrdersInput = {
    update: XOR<DeliveryAgentUpdateWithoutDeliveryOrdersInput, DeliveryAgentUncheckedUpdateWithoutDeliveryOrdersInput>
    create: XOR<DeliveryAgentCreateWithoutDeliveryOrdersInput, DeliveryAgentUncheckedCreateWithoutDeliveryOrdersInput>
    where?: DeliveryAgentWhereInput
  }

  export type DeliveryAgentUpdateToOneWithWhereWithoutDeliveryOrdersInput = {
    where?: DeliveryAgentWhereInput
    data: XOR<DeliveryAgentUpdateWithoutDeliveryOrdersInput, DeliveryAgentUncheckedUpdateWithoutDeliveryOrdersInput>
  }

  export type DeliveryAgentUpdateWithoutDeliveryOrdersInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNumber?: StringFieldUpdateOperationsInput | string
    vehicleType?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryAgentUncheckedUpdateWithoutDeliveryOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleNumber?: StringFieldUpdateOperationsInput | string
    vehicleType?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type SellerOrderUpsertWithWhereUniqueWithoutOrderInput = {
    where: SellerOrderWhereUniqueInput
    update: XOR<SellerOrderUpdateWithoutOrderInput, SellerOrderUncheckedUpdateWithoutOrderInput>
    create: XOR<SellerOrderCreateWithoutOrderInput, SellerOrderUncheckedCreateWithoutOrderInput>
  }

  export type SellerOrderUpdateWithWhereUniqueWithoutOrderInput = {
    where: SellerOrderWhereUniqueInput
    data: XOR<SellerOrderUpdateWithoutOrderInput, SellerOrderUncheckedUpdateWithoutOrderInput>
  }

  export type SellerOrderUpdateManyWithWhereWithoutOrderInput = {
    where: SellerOrderScalarWhereInput
    data: XOR<SellerOrderUpdateManyMutationInput, SellerOrderUncheckedUpdateManyWithoutOrderInput>
  }

  export type PaymentUpsertWithWhereUniqueWithoutOrderInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutOrderInput, PaymentUncheckedUpdateWithoutOrderInput>
    create: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutOrderInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutOrderInput, PaymentUncheckedUpdateWithoutOrderInput>
  }

  export type PaymentUpdateManyWithWhereWithoutOrderInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderTrackingUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderTrackingWhereUniqueInput
    update: XOR<OrderTrackingUpdateWithoutOrderInput, OrderTrackingUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderTrackingCreateWithoutOrderInput, OrderTrackingUncheckedCreateWithoutOrderInput>
  }

  export type OrderTrackingUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderTrackingWhereUniqueInput
    data: XOR<OrderTrackingUpdateWithoutOrderInput, OrderTrackingUncheckedUpdateWithoutOrderInput>
  }

  export type OrderTrackingUpdateManyWithWhereWithoutOrderInput = {
    where: OrderTrackingScalarWhereInput
    data: XOR<OrderTrackingUpdateManyMutationInput, OrderTrackingUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderTrackingScalarWhereInput = {
    AND?: OrderTrackingScalarWhereInput | OrderTrackingScalarWhereInput[]
    OR?: OrderTrackingScalarWhereInput[]
    NOT?: OrderTrackingScalarWhereInput | OrderTrackingScalarWhereInput[]
    id?: IntFilter<"OrderTracking"> | number
    orderId?: IntFilter<"OrderTracking"> | number
    status?: EnumTrackingStatusFilter<"OrderTracking"> | $Enums.TrackingStatus
    description?: StringFilter<"OrderTracking"> | string
    location?: StringNullableFilter<"OrderTracking"> | string | null
    createdAt?: DateTimeFilter<"OrderTracking"> | Date | string
  }

  export type OrderCreateWithoutItemsInput = {
    orderNumber: string
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    deliveryAgent?: DeliveryAgentCreateNestedOneWithoutDeliveryOrdersInput
    sellerOrders?: SellerOrderCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
    tracking?: OrderTrackingCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: number
    orderNumber: string
    customerId: number
    deliveryAgentId?: number | null
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sellerOrders?: SellerOrderUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
    tracking?: OrderTrackingUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutOrderItemsInput = {
    name: string
    description?: string | null
    price: number
    originalPrice?: number | null
    image?: string | null
    category?: string | null
    subcategory?: string | null
    stock?: number
    inStock?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    seller: SellerCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: number
    name: string
    description?: string | null
    price: number
    originalPrice?: number | null
    image?: string | null
    category?: string | null
    subcategory?: string | null
    stock?: number
    inStock?: boolean
    isActive?: boolean
    sellerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    orderNumber?: StringFieldUpdateOperationsInput | string
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    deliveryAgent?: DeliveryAgentUpdateOneWithoutDeliveryOrdersNestedInput
    sellerOrders?: SellerOrderUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
    tracking?: OrderTrackingUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    deliveryAgentId?: NullableIntFieldUpdateOperationsInput | number | null
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sellerOrders?: SellerOrderUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
    tracking?: OrderTrackingUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ProductUpdateWithoutOrderItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    inStock?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seller?: SellerUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    inStock?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sellerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateWithoutSellerOrdersInput = {
    orderNumber: string
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    deliveryAgent?: DeliveryAgentCreateNestedOneWithoutDeliveryOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
    tracking?: OrderTrackingCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutSellerOrdersInput = {
    id?: number
    orderNumber: string
    customerId: number
    deliveryAgentId?: number | null
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
    tracking?: OrderTrackingUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutSellerOrdersInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutSellerOrdersInput, OrderUncheckedCreateWithoutSellerOrdersInput>
  }

  export type SellerCreateWithoutSellerOrdersInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    businessName: string
    website?: string | null
    category: string
    subcategories: string
    businessAddress: string
    businessCity: string
    businessState: string
    businessPincode: string
    businessArea?: string | null
    businessLocality?: string | null
    businessDescription?: string | null
    businessImage?: string | null
    openingHours?: string | null
    isVerified?: boolean
    isPromoted?: boolean
    rating?: number
    totalReviews?: number
    deliveryTime?: string | null
    isOpen?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutSellerInput
  }

  export type SellerUncheckedCreateWithoutSellerOrdersInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    businessName: string
    website?: string | null
    category: string
    subcategories: string
    businessAddress: string
    businessCity: string
    businessState: string
    businessPincode: string
    businessArea?: string | null
    businessLocality?: string | null
    businessDescription?: string | null
    businessImage?: string | null
    openingHours?: string | null
    isVerified?: boolean
    isPromoted?: boolean
    rating?: number
    totalReviews?: number
    deliveryTime?: string | null
    isOpen?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutSellerInput
  }

  export type SellerCreateOrConnectWithoutSellerOrdersInput = {
    where: SellerWhereUniqueInput
    create: XOR<SellerCreateWithoutSellerOrdersInput, SellerUncheckedCreateWithoutSellerOrdersInput>
  }

  export type OrderUpsertWithoutSellerOrdersInput = {
    update: XOR<OrderUpdateWithoutSellerOrdersInput, OrderUncheckedUpdateWithoutSellerOrdersInput>
    create: XOR<OrderCreateWithoutSellerOrdersInput, OrderUncheckedCreateWithoutSellerOrdersInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutSellerOrdersInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutSellerOrdersInput, OrderUncheckedUpdateWithoutSellerOrdersInput>
  }

  export type OrderUpdateWithoutSellerOrdersInput = {
    orderNumber?: StringFieldUpdateOperationsInput | string
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    deliveryAgent?: DeliveryAgentUpdateOneWithoutDeliveryOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
    tracking?: OrderTrackingUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutSellerOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    deliveryAgentId?: NullableIntFieldUpdateOperationsInput | number | null
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
    tracking?: OrderTrackingUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type SellerUpsertWithoutSellerOrdersInput = {
    update: XOR<SellerUpdateWithoutSellerOrdersInput, SellerUncheckedUpdateWithoutSellerOrdersInput>
    create: XOR<SellerCreateWithoutSellerOrdersInput, SellerUncheckedCreateWithoutSellerOrdersInput>
    where?: SellerWhereInput
  }

  export type SellerUpdateToOneWithWhereWithoutSellerOrdersInput = {
    where?: SellerWhereInput
    data: XOR<SellerUpdateWithoutSellerOrdersInput, SellerUncheckedUpdateWithoutSellerOrdersInput>
  }

  export type SellerUpdateWithoutSellerOrdersInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    subcategories?: StringFieldUpdateOperationsInput | string
    businessAddress?: StringFieldUpdateOperationsInput | string
    businessCity?: StringFieldUpdateOperationsInput | string
    businessState?: StringFieldUpdateOperationsInput | string
    businessPincode?: StringFieldUpdateOperationsInput | string
    businessArea?: NullableStringFieldUpdateOperationsInput | string | null
    businessLocality?: NullableStringFieldUpdateOperationsInput | string | null
    businessDescription?: NullableStringFieldUpdateOperationsInput | string | null
    businessImage?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isPromoted?: BoolFieldUpdateOperationsInput | boolean
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    deliveryTime?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutSellerNestedInput
  }

  export type SellerUncheckedUpdateWithoutSellerOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    subcategories?: StringFieldUpdateOperationsInput | string
    businessAddress?: StringFieldUpdateOperationsInput | string
    businessCity?: StringFieldUpdateOperationsInput | string
    businessState?: StringFieldUpdateOperationsInput | string
    businessPincode?: StringFieldUpdateOperationsInput | string
    businessArea?: NullableStringFieldUpdateOperationsInput | string | null
    businessLocality?: NullableStringFieldUpdateOperationsInput | string | null
    businessDescription?: NullableStringFieldUpdateOperationsInput | string | null
    businessImage?: NullableStringFieldUpdateOperationsInput | string | null
    openingHours?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isPromoted?: BoolFieldUpdateOperationsInput | boolean
    rating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    deliveryTime?: NullableStringFieldUpdateOperationsInput | string | null
    isOpen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutSellerNestedInput
  }

  export type OrderCreateWithoutPaymentsInput = {
    orderNumber: string
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    deliveryAgent?: DeliveryAgentCreateNestedOneWithoutDeliveryOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    sellerOrders?: SellerOrderCreateNestedManyWithoutOrderInput
    tracking?: OrderTrackingCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutPaymentsInput = {
    id?: number
    orderNumber: string
    customerId: number
    deliveryAgentId?: number | null
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    sellerOrders?: SellerOrderUncheckedCreateNestedManyWithoutOrderInput
    tracking?: OrderTrackingUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutPaymentsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>
  }

  export type CustomerCreateWithoutPaymentsInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutPaymentsInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutPaymentsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutPaymentsInput, CustomerUncheckedCreateWithoutPaymentsInput>
  }

  export type OrderUpsertWithoutPaymentsInput = {
    update: XOR<OrderUpdateWithoutPaymentsInput, OrderUncheckedUpdateWithoutPaymentsInput>
    create: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutPaymentsInput, OrderUncheckedUpdateWithoutPaymentsInput>
  }

  export type OrderUpdateWithoutPaymentsInput = {
    orderNumber?: StringFieldUpdateOperationsInput | string
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    deliveryAgent?: DeliveryAgentUpdateOneWithoutDeliveryOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    sellerOrders?: SellerOrderUpdateManyWithoutOrderNestedInput
    tracking?: OrderTrackingUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    deliveryAgentId?: NullableIntFieldUpdateOperationsInput | number | null
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    sellerOrders?: SellerOrderUncheckedUpdateManyWithoutOrderNestedInput
    tracking?: OrderTrackingUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type CustomerUpsertWithoutPaymentsInput = {
    update: XOR<CustomerUpdateWithoutPaymentsInput, CustomerUncheckedUpdateWithoutPaymentsInput>
    create: XOR<CustomerCreateWithoutPaymentsInput, CustomerUncheckedCreateWithoutPaymentsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutPaymentsInput, CustomerUncheckedUpdateWithoutPaymentsInput>
  }

  export type CustomerUpdateWithoutPaymentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type OrderCreateWithoutTrackingInput = {
    orderNumber: string
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    deliveryAgent?: DeliveryAgentCreateNestedOneWithoutDeliveryOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    sellerOrders?: SellerOrderCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutTrackingInput = {
    id?: number
    orderNumber: string
    customerId: number
    deliveryAgentId?: number | null
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    sellerOrders?: SellerOrderUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutTrackingInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutTrackingInput, OrderUncheckedCreateWithoutTrackingInput>
  }

  export type OrderUpsertWithoutTrackingInput = {
    update: XOR<OrderUpdateWithoutTrackingInput, OrderUncheckedUpdateWithoutTrackingInput>
    create: XOR<OrderCreateWithoutTrackingInput, OrderUncheckedCreateWithoutTrackingInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutTrackingInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutTrackingInput, OrderUncheckedUpdateWithoutTrackingInput>
  }

  export type OrderUpdateWithoutTrackingInput = {
    orderNumber?: StringFieldUpdateOperationsInput | string
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    deliveryAgent?: DeliveryAgentUpdateOneWithoutDeliveryOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    sellerOrders?: SellerOrderUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutTrackingInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    deliveryAgentId?: NullableIntFieldUpdateOperationsInput | number | null
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    sellerOrders?: SellerOrderUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyCustomerInput = {
    id?: number
    orderNumber: string
    deliveryAgentId?: number | null
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManyCustomerInput = {
    id?: number
    paymentId: string
    orderId: number
    amount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    transactionId?: string | null
    gateway?: string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutCustomerInput = {
    orderNumber?: StringFieldUpdateOperationsInput | string
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAgent?: DeliveryAgentUpdateOneWithoutDeliveryOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    sellerOrders?: SellerOrderUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
    tracking?: OrderTrackingUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    deliveryAgentId?: NullableIntFieldUpdateOperationsInput | number | null
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    sellerOrders?: SellerOrderUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
    tracking?: OrderTrackingUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    deliveryAgentId?: NullableIntFieldUpdateOperationsInput | number | null
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutCustomerInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    gateway?: NullableStringFieldUpdateOperationsInput | string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    paymentId?: StringFieldUpdateOperationsInput | string
    orderId?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    gateway?: NullableStringFieldUpdateOperationsInput | string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    paymentId?: StringFieldUpdateOperationsInput | string
    orderId?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    gateway?: NullableStringFieldUpdateOperationsInput | string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManySellerInput = {
    id?: number
    name: string
    description?: string | null
    price: number
    originalPrice?: number | null
    image?: string | null
    category?: string | null
    subcategory?: string | null
    stock?: number
    inStock?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SellerOrderCreateManySellerInput = {
    id?: number
    orderId: number
    status?: $Enums.OrderStatus
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    commission?: number
    netAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateWithoutSellerInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    inStock?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSellerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    inStock?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutSellerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    originalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    inStock?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerOrderUpdateWithoutSellerInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutSellerOrdersNestedInput
  }

  export type SellerOrderUncheckedUpdateWithoutSellerInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerOrderUncheckedUpdateManyWithoutSellerInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyDeliveryAgentInput = {
    id?: number
    orderNumber: string
    customerId: number
    orderStatus?: $Enums.OrderStatus
    customerName: string
    customerPhone: string
    customerAddress: string
    customerCity: string
    customerArea: string
    customerLocality?: string | null
    subtotal: number
    deliveryFee: number
    taxAmount?: number
    totalAmount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    deliveryInstructions?: string | null
    estimatedDeliveryTime?: Date | string | null
    actualDeliveryTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutDeliveryAgentInput = {
    orderNumber?: StringFieldUpdateOperationsInput | string
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    sellerOrders?: SellerOrderUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
    tracking?: OrderTrackingUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutDeliveryAgentInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    sellerOrders?: SellerOrderUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
    tracking?: OrderTrackingUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutDeliveryAgentInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    orderStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    customerAddress?: StringFieldUpdateOperationsInput | string
    customerCity?: StringFieldUpdateOperationsInput | string
    customerArea?: StringFieldUpdateOperationsInput | string
    customerLocality?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    deliveryFee?: FloatFieldUpdateOperationsInput | number
    taxAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeliveryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyProductInput = {
    id?: number
    orderId: number
    quantity: number
    unitPrice: number
    totalPrice: number
    productName: string
    productImage?: string | null
    productCategory?: string | null
  }

  export type OrderItemUpdateWithoutProductInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemCreateManyOrderInput = {
    id?: number
    productId: number
    quantity: number
    unitPrice: number
    totalPrice: number
    productName: string
    productImage?: string | null
    productCategory?: string | null
  }

  export type SellerOrderCreateManyOrderInput = {
    id?: number
    sellerId: number
    status?: $Enums.OrderStatus
    items: JsonNullValueInput | InputJsonValue
    subtotal: number
    commission?: number
    netAmount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManyOrderInput = {
    id?: number
    paymentId: string
    customerId: number
    amount: number
    paymentMethod: $Enums.PaymentMethod
    paymentStatus?: $Enums.PaymentStatus
    transactionId?: string | null
    gateway?: string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderTrackingCreateManyOrderInput = {
    id?: number
    status: $Enums.TrackingStatus
    description: string
    location?: string | null
    createdAt?: Date | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: FloatFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SellerOrderUpdateWithoutOrderInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seller?: SellerUpdateOneRequiredWithoutSellerOrdersNestedInput
  }

  export type SellerOrderUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    sellerId?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SellerOrderUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    sellerId?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    items?: JsonNullValueInput | InputJsonValue
    subtotal?: FloatFieldUpdateOperationsInput | number
    commission?: FloatFieldUpdateOperationsInput | number
    netAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutOrderInput = {
    paymentId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    gateway?: NullableStringFieldUpdateOperationsInput | string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    paymentId?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    gateway?: NullableStringFieldUpdateOperationsInput | string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    paymentId?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    gateway?: NullableStringFieldUpdateOperationsInput | string | null
    gatewayResponse?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderTrackingUpdateWithoutOrderInput = {
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderTrackingUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderTrackingUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: EnumTrackingStatusFieldUpdateOperationsInput | $Enums.TrackingStatus
    description?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}