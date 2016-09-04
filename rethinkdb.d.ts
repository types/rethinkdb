import Bluebird = require('bluebird');
import { EventEmitter } from 'events';

/**
 * Basic data types:
 *
 * - `RString`
 * - `RNumber`
 * - `RBoolean`
 * - `RObject`
 * - `RArray`
 *
 * RethinkDB data types:
 *
 * - `RDb`
 * - `RTableSlice` (implements `RSelection`)
 * - `RTable` (extends `RTableSlice`)
 * - `RStream`
 * - `RSelection` (note: `RSingleSelection` is a `RSelection<RObject>`)
 * - `RBinary`
 * - `RTime`
 * - `RGeometry` (extended by `RLine`, `RPoint`, `RPolygon`, etc)
 * - `RGroupedStream`
 *
 * Note: Sequence types are `RArray`, `RStream`, `RSelection` and `RTableSlice`.
 * Note: Single selection is an older term for `Selection<Object>`.
 */

declare namespace rethinkdb {
  export interface RArray <T> extends
    RRunable<T[]>,
    RValue<T[]>,
    r.Add<r.ArrayLike<T>>,
    r.Append<T>,
    r.ChangeAt<T>,
    r.DeleteAt<T>,
    r.Difference<T>,
    r.InsertAt<T>,
    r.Map.Array<T>,
    r.Mul,
    r.Prepend<T>,
    r.SetDifference<T>,
    r.SetInsert<T>,
    r.SetIntersection<T>,
    r.SetUnion<T>,
    r.Skip,
    r.Limit,
    r.OffsetsOf.Sequence<T>,
    r.Union.Array<T>,
    r.SpliceAt<T>,
    r.Count.Datum,
    r.OrderBy.Sequence<T>,
    r.Bracket.Array<T>,
    r.GetField.Array<T>,
    r.WithFields.Array {}

  export interface RArrayJoin <Left, Right> extends
    RArray<JoinResult<Left, Right>>,
    r.Zip<RArray<Left & Right>> {}

  export interface RStream <T> extends
    RObservable<T>,
    RRunable<Cursor<T>>,
    r.OrderBy.Sequence<T>,
    r.Union.Stream<T>,
    r.ConcatMap.Stream<T>,
    r.Filter<T>,
    r.Bracket.Stream,
    r.GetField.Stream,
    r.OffsetsOf.Stream<T>,
    r.Skip,
    r.Limit,
    r.Map.Sequence<T>,
    r.Count.Sequence<T>,
    r.HasFields<RStream<T>>,
    r.Distinct.Sequence<T>,
    r.Sample<RArray<T>> {}

  export interface RStreamJoin <Left, Right> extends
    RStream<JoinResult<Left, Right>>,
    r.Zip<RStream<Left & Right>> {}

  export interface RSelection <T> extends
    RObservable<T>,
    RAny,
    RCoercable,
    RToJSON,
    r.Operators<T>,
    r.Avg<T>,
    r.Contains<T>,
    r.Count.Sequence<T>,
    r.Default<T>,
    r.ForEach<T>,
    r.Group<T>,
    r.IsEmpty,
    r.Max<T>,
    r.Min<T>,
    r.OffsetsOf.Stream<T>,
    r.Reduce<T>,
    r.Slice,
    r.Sum<T>,
    r.Skip,
    r.Limit,
    r.Map.Sequence<T>,
    r.OrderBy.Selection<T>,
    RRunable<Cursor<T>>,
    r.Union.Stream<T>,
    r.ConcatMap.Stream<T>,
    r.Filter<T>,
    r.Bracket.Stream,
    r.GetField.Stream,
    r.HasFields<RStream<T>>,
    r.Sample<RArray<T>>,
    r.Nth.Selection<T>,
    ROperations<T> {}

  export interface RValue <T> extends
    RAny,
    RCoercable,
    RToJSON,
    RRunable<T>,
    r.Default<T>,
    r.Operators<T> {}

  export interface RDatum <T> extends
    RValue<T>,
    RRunable<T>,
    RAny,
    r.Bracket.Datum<T>,
    r.GetField.Object,
    // Object.
    RToJSON,
    RCoercable,
    r.Count.Datum,
    r.HasFields<RBoolean<boolean>>,
    r.Merge.Object<T>,
    r.Pluck.Object,
    r.Without.Object,
    r.Default<T>,
    r.Keys,
    r.Values<any>,
    // Number.
    r.Ceil,
    r.Div,
    r.Floor,
    r.Mod,
    r.Mul,
    r.Round,
    r.Sub<r.NumberLike<number> | r.TimeLike>,
    // String.
    r.Count.Datum,
    r.Downcase,
    r.Match,
    r.Split,
    r.Upcase,
    // Array.
    r.Add<r.DatumLike>,
    r.Append<T>,
    r.ChangeAt<T>,
    r.DeleteAt<T>,
    r.Difference<T>,
    r.InsertAt<T>,
    r.Map.Array<T>,
    r.Mul,
    r.Prepend<T>,
    r.SetDifference<T>,
    r.SetInsert<T>,
    r.SetIntersection<T>,
    r.SetUnion<T>,
    r.Skip,
    r.Limit,
    r.OffsetsOf.Sequence<T>,
    r.Union.Array<T>,
    r.SpliceAt<T>,
    r.Count.Datum,
    r.WithFields.Array,
    // Boolean.
    r.And, r.Not, r.Or,
    // Time.
    r.Date, r.DayOfWeek, r.DayOfYear,
    r.During, r.InTimezone,
    r.Seconds, r.Minutes, r.Hours, r.Month, r.Year, r.Day,
    r.TimeOfDay, r.Timezone, r.ToEpochTime, r.ToISO8601,
    // Geometry.
    RGeometry<T> {}

  export interface RBoolean <T extends boolean> extends
    RValue<T>,
    r.And, r.Not, r.Or {}

  export interface RNumber <T extends number> extends
    RValue<T>,
    r.Add<r.NumberLike<T>>,
    r.Ceil,
    r.Div,
    r.Floor,
    r.Mod,
    r.Mul,
    r.Round,
    r.Sub<r.NumberLike<T>> {}

  export interface RString <T extends string> extends
    RValue<T>,
    r.Count.Datum,
    r.Add<r.StringLike<T>>,
    r.Downcase,
    r.Match,
    r.Split,
    r.Upcase {}

  export interface RTime extends
    RValue<Date>,
    r.Add<r.TimeLike>,
    r.Sub<r.TimeLike>,
    r.Date, r.DayOfWeek, r.DayOfYear,
    r.During, r.InTimezone,
    r.Seconds, r.Minutes, r.Hours, r.Month, r.Year, r.Day,
    r.TimeOfDay, r.Timezone, r.ToEpochTime, r.ToISO8601 {}

  export interface RError extends RValue<Error> {}

  export interface RSpecial <T> extends RValue<T> {}

  export interface RObject <T> extends
    RAny,
    RValue<T>,
    r.Bracket.Object,
    r.GetField.Object,
    RToJSON,
    RCoercable,
    r.Count.Datum,
    r.HasFields<RBoolean<boolean>>,
    r.Merge.Object<T>,
    r.Pluck.Object,
    r.Without.Object,
    r.Default<T>,
    r.Keys,
    r.Values<any> {}

  export interface RSingleSelection <T> extends
    RObject<T>,
    ROperations<T>,
    RObservable<T> {}

  export interface RAny {
    /**
     * Call an anonymous function using return values from other ReQL commands or queries as arguments.
     *
     * https://rethinkdb.com/api/javascript/do
     */
    do <R extends RAny, Arg1 extends RAny, Arg2 extends RAny, Arg3 extends RAny> (arg1: Arg1, arg2: Arg2, arg3: Arg3, expr: (arg1: Arg1, arg2: Arg2, arg3: Arg3) => R): R;
    do <R extends RAny, Arg1 extends RAny, Arg2 extends RAny> (arg1: Arg1, arg2: Arg2, expr: (arg1: Arg1, arg2: Arg2) => R): R;
    do <R extends RAny, Arg1 extends RAny> (arg1: Arg1, expr: (arg1: Arg1) => R): R;
    do <R extends RAny> (expr: (thisObject: this) => R): R;
    do <R extends RAny, Arg extends RAny> (...argsAndFunction: (Arg | ((thisObject: this) => R))[]): R;

    /**
     * Get information about a ReQL value.
     *
     * https://rethinkdb.com/api/javascript/info
     */
    info (): RObject<any>;

    /**
     * Gets the type of a value.
     *
     * https://rethinkdb.com/api/javascript/type_of
     */
    typeOf (): RString<TypeOf>;
  }

  export type TypeOf = 'Array' | 'BOOL' | 'DB' | 'Function' | 'GROUPED_DATA' |
    'GROUPED_STREAM' | 'MAXVAL' | 'MINVAL' | 'NULL' | 'NUMBER' | 'OBJECT' |
    'PTYPE<BINARY>' | 'PTYPE<GEOMETRY>' | 'PTYPE<TIME>' | 'SELECTION<ARRAY>' |
    'SELECTION<OBJECT>' | 'SELECTION<STREAM>' | 'STREAM' | 'STRING' |
    'TABLE_SLICE' | 'TABLE';

  type IndexFunction <T> = RValue<any> | Array<RValue<any>> | ((item: RValue<T> | RObject<T>) => RValue<any>);
  type KeyType = r.StringLike<string> | r.NumberLike<number> | r.TimeLike | r.ArrayLike<r.StringLike<string> | r.NumberLike<number> | r.TimeLike> | RSpecial<any>;

  interface IndexOptions {
    index?: string;
  }

  export type Bound = 'closed' | 'open';

  export interface BoundOptions {
    leftBound?: Bound;
    rightBound?: Bound;
  }

  export type BetweenOptions = IndexOptions & BoundOptions;

  export interface JoinOptions extends IndexOptions {
    ordered?: boolean;
  }

  export interface DistanceOptions {
    /**
     * Unit for the distance. Possible values are `m` (meter, the default), `km` (kilometer), `mi` (international mile), `nm` (nautical mile), `ft` (international foot).
     */
    unit?: 'm' | 'km' | 'mi' | 'nm' | 'ft';
    /**
     * The reference ellipsoid to use for geographic coordinates. Possible values are `WGS84` (the default), a common standard for Earth’s geometry, or `unit_sphere`, a perfect sphere of 1 meter radius.
     */
    geoSystem?: 'WGS84' | 'unit_sphere';
  }

  export interface CircleOptions extends DistanceOptions {
    /**
     * The number of vertices in the polygon or line. Defaults to 32.
     */
    numVertices?: number;
    /**
     * If `true` (the default) the circle is filled, creating a polygon; if `false` the circle is unfilled (creating a line).
     */
    fill?: boolean;
  }

  export interface GetNearestOptions extends DistanceOptions {
    index: string;
    /**
     * The maximum number of results to return (default 100).
     */
    maxResults?: number;
    /**
     * The maximum distance from an object to the specified point (default 100 km).
     */
    maxDist?: number;
  }

  export interface GetNearestResult <T> {
    dist: number;
    doc: T;
  }

  export interface IndexRenameOptions {
    overwrite: boolean;
  }

  export interface IndexRenameResult {
    renamed: boolean;
  }

  export interface IndexStatusResult {
    index: string;
    ready: boolean;
    progress?: number;
    function: Buffer;
    multi: boolean;
    geo: boolean;
    outdated: boolean;
  }

  export interface StatusResult {
    id: string;
    name: string;
    db: string;
    status: {
      all_replicas_ready: boolean;
      ready_for_outdated_reads: boolean;
      ready_for_reads: boolean;
      ready_for_writes: boolean;
    };
    shards: Array<{ primary_replicas: string[], replicas: Array<{ server: string, state: 'ready' | 'transitioning' | 'backfilling' | 'disconnected' | 'waiting_for_primary' | 'waiting_for_quorum' }> }>
  }

  export interface IndexCreateOptions {
    /**
     * Geospatial indexes based on indexes of geometry objects, created when the `geo` optional argument is true.
     */
    geo?: boolean;
    /**
     * Multi indexes based on arrays of values, created when the `multi` optional argument is `true`.
     */
    multi?: boolean;
  }

  /**
   * RethinkDB uses promises or Node.js-style callbacks.
   */
  export interface Callback <T> {
    (err: Error | void, res: T): void;
  }

  /**
   * Options used when creating a new connection.
   */
  export interface ConnectOptions {
    /**
     * The host to connect to (default: `localhost`).
     */
    host?: string;
    /**
     * The port the connect on (default: `28015`).
     */
    port?: number | string;
    /**
     * The default database (default: `test`).
     */
    db?: string;
    /**
     * The user account to connect as (default: `admin`).
     */
    user?: string;
    /**
     * The password for the user account to connect as (default: `''`, empty).
     */
    password?: string;
    /**
     * Timeout period in seconds for the connection to be opened (default: `20`).
     */
    timeout?: number;
    /**
     * A hash of options to support SSL connections (default: `null`). Currently, there is only one option available, and if the `ssl` option is specified, this key is required.
     */
    ssl?: {
      /**
       * A list of Node.js `Buffer` objects containing SSL CA certificates.
       */
      ca: string | Buffer | (string | Buffer)[];
    };
  }

  /**
   * Options used when closing a connection.
   */
  export interface CloseOptions {
    noreplayWait?: boolean
  }

  /**
   * The connection object passed around for queries.
   */
  export interface Connection extends EventEmitter {
    clientPort (): number;
    clientAddress (): string;

    /**
     * Close an open connection. If no callback is provided, a promise will be returned.
     */
    close (cb: Callback<void>): void;
    close (options: CloseOptions, cb: Callback<void>): void;
    close (options?: CloseOptions): Bluebird<void>;

    /**
     * Close and reopen a connection. If no callback is provided, a promise will be returned.
     */
    reconnect (cb: Callback<Connection>): void;
    reconnect (options: CloseOptions, cb: Callback<Connection>): void;
    reconnect (options?: CloseOptions): Bluebird<Connection>;

    /**
     * Change the default database on this connection.
     */
    use <T extends string> (dbName: T): T;

    /**
     * `noreplyWait` ensures that previous queries with the `noreply` flag have been processed by the server. Note that this guarantee only applies to queries run on the given connection.
     */
    noreplyWait (cb: Callback<void>): void;
    noreplyWait (): Bluebird<void>;

    /**
     * Return information about the server being used by a connection.
     */
    server (cb: Callback<ServerInfo>): void;
    server (): Bluebird<ServerInfo>;

    /**
     * Check if the connection is open.
     */
    isOpen (): boolean;
  }

  /**
   * Object result of getting server info from connection.
   */
  export interface ServerInfo {
    id: string;
    name: string;
    proxy: boolean;
  }

  /**
   * Options for streaming.
   */
  export interface StreamOptions {
    /**
     * Controls how change notifications are batched.
     */
    squash?: boolean | number;
    /**
     * The number of changes the server will buffer between client reads before it starts dropping changes and generates an error (default: 100,000).
     */
    changefeedQueueSize?: number;
    /**
     * If `true`, the changefeed stream will begin with the current contents of the table or selection being monitored. These initial results will have `new_val` fields, but no `old_val` fields. The initial results may be intermixed with actual changes, as long as an initial result for the changed document has already been given. If an initial result for a document has been sent and a change is made to that document that would move it to the unsent part of the result set (e.g., a changefeed monitors the top 100 posters, the first 50 have been sent, and poster 48 has become poster 52), an “uninitial” notification will be sent, with an `old_val` field but no `new_val` field.
     */
    includeInitial?: boolean;
    /**
     * If `true`, the changefeed stream will include special status documents consisting of the field `state` and a string indicating a change in the feed’s state. These documents can occur at any point in the feed between the notification documents described below. If `includeStates` is `false` (the default), the status documents will not be sent.
     */
    includeStates?: boolean;
    /**
     * If `true`, a changefeed stream on an `orderBy.limit` changefeed will include `old_offset` and `new_offset` fields in status documents that include `old_val` and `new_val`. This allows applications to maintain ordered lists of the stream’s result set. If `old_offset` is set and not `null`, the element at `old_offset` is being deleted; if `new_offset` is set and not null, then `new_val` is being inserted at `new_offset`. Setting `includeOffsets` to `true` on a changefeed that does not support it will raise an error.
     */
    includeOffsets?: boolean;
    /**
     * If `true`, every result on a changefeed will include a `type` field with a string that indicates the kind of change the result represents: `add`, `remove`, `change`, `initial`, `uninitial`, state. Defaults to `false`.
     */
    includeTypes?: boolean;
  }

  export interface WriteOptions {
    /**
     * Possible values are `hard` and `soft`. This option will override the table or query’s durability setting (set in run). In soft durability mode RethinkDB will acknowledge the write immediately after receiving and caching it, but before the write has been committed to disk.
     */
    durability?: 'hard' | 'soft';
    /**
     * `true`: return a changes array consisting of `old_val`/`new_val` objects describing the changes made, only including the documents actually updated.
     * `false`: do not return a `changes` array (the default).
     * `"always"`: behave as true, but include all documents the command tried to update whether or not the update was successful. (This was the behavior of `true` pre-2.0.)
     */
    returnChanges?: 'always' | boolean;
  }

  export interface InsertOptions <T> extends WriteOptions {
    /**
     * Determine handling of inserting documents with the same primary key as existing entries. There are three built-in methods: `"error"`, `"replace"` or `"update"`; alternatively, you may provide a conflict resolution function.
     */
    conflict?: 'error' | 'replace' | 'update' | ((id: string, oldDoc: RObject<T>, newDoc: RObject<T>) => RObject<T>);
  }

  export interface UpdateOptions extends WriteOptions {
    /**
     * If set to `true`, executes the update and distributes the result to replicas in a non-atomic fashion. This flag is required to perform non-deterministic updates, such as those that require reading data from another table.
     */
    nonAtomic?: boolean;
  }

  export interface TableOptions {
    /**
     * One of three possible values affecting the consistency guarantee for the table read:
     *
     * - `single` returns values that are in memory (but not necessarily written to disk) on the primary replica. This is the default.
     * - `majority` will only return values that are safely committed on disk on a majority of replicas. This requires sending a message to every replica on each read, so it is the slowest but most consistent.
     * - `outdated` will return values that are in memory on an arbitrarily-selected replica. This is the fastest but least consistent.
     */
    readMode?: 'single' | 'majority' | 'outdated';
    /**
     * Possible values are `name` and `uuid`, with a default of `name`. If set to `uuid`, then system tables will refer to servers, databases and tables by UUID rather than name. (This only has an effect when used with system tables.)
     */
    identifierFormat?: 'name' | 'uuid';
  }

  export interface TableCreateOptions {
    /**
     * The name of the primary key. The default primary key is `id`.
     */
    primaryKey?: string;
    /**
     * If set to `soft`, writes will be acknowledged by the server immediately and flushed to disk in the background. The default is `hard`: acknowledgment of writes happens after data has been written to disk.
     */
    durability?: string;
    /**
     * The number of shards, an integer from 1-64. Defaults to `1`.
     */
    shards?: number;
    /**
     * Either an integer or a mapping object. Defaults to 1.
     */
    replicas?: number | { [tag: string]: number };
    /**
     * The primary server specified by its server tag. Required if `replicas` is an object; the tag must be in the object. This must _not_ be specified if `replicas` is an integer.
     */
    primaryReplicaTag?: string;
  }

  export interface ChangeSet <Old, New> {
    old_val: Old;
    new_val: New;
  }

  export interface ChangeState {
    state: 'initializing' | 'ready';
  }

  export interface ChangeFeed <T> extends ChangeSet<T | void, T | void> {
    type?: string;
  }

  export interface IndexCreateResult {
    created: number;
  }

  export interface Config {
    id: string;
    name: string;
    db: string;
    primary_key: string;
    shards: Array<{ primary_replica: string, replicas: string[], nonvoting_replicates: string[] }>;
    indexes: string[];
    write_acks: string;
    durability: string;
  }

  export interface DbCreateResult {
    dbs_created: number;
    config_changes: ChangeSet<void, Config>;
  }

  export interface DbDropResult {
    dbs_dropped: number;
    tables_dropped: number;
    config_changes: ChangeSet<Config, void>;
  }

  export interface TableCreateResult {
    tables_created: number;
    config_changes: ChangeSet<void, Config>;
  }

  export interface TableDropResult {
    tables_dropped: number;
    config_changes: ChangeSet<Config, void>;
  }

  export interface WriteResult <I, R, U, D, S> {
    /**
     * The number of documents successfully inserted.
     */
    inserted: I;
    /**
     * The number of documents updated when conflict is set to "replace" or "update".
     */
    replaced: R;
    /**
     * The number of documents whose fields are identical to existing documents with the same primary key when `conflict` is set to "replace" or "update".
     */
    unchanged: U;
    /**
     * The number of errors encountered while performing the insert.
     */
    errors: number;
    /**
     * If errors were encountered, contains the text of the first error.
     */
    first_error: string;
    /**
     * The number of documents that were deleted.
     */
    deleted: D;
    /**
     * The number of documents that were skipped because the document didn’t exist.
     */
    skipped: S;
  }

  export interface UpdateResult <T> extends WriteResult<number /* 0 */, number, number, number /* 0 */, number> {
    /**
     * If `returnChanges` is set to `true`, this will be an array of objects, one for each objected affected by the `update` operation.
     */
    changes?: ChangeSet<T, T>;
  }

  export interface ReplaceResult <T> extends WriteResult<number, number, number, number, number /* 0 */> {
    /**
     * If `returnChanges` is set to `true`, this will be an array of objects, one for each objected affected by the `replace` operation.
     */
    changes?: ChangeSet<T, T>;
  }

  export interface DeleteResult <T> extends WriteResult<number /* 0 */, number /* 0 */, number /* 0 */, number, number> {
    /**
     * If `returnChanges` is set to `true`, this will be an array of objects, one for each objected affected by the `delete` operation.
     */
    changes?: ChangeSet<T, void>;
  }

  export interface InsertResult <T> extends WriteResult<number, number, number, number /* 0 */, number /* 0 */> {
    /**
     * A list of generated primary keys for inserted documents whose primary keys were not specified (capped to 100,000).
     */
    generated_keys?: string[];
    /**
     * If the field generated_keys is truncated, you will get the warning “Too many generated keys (<X>), array truncated to 100000.”.
     */
    warnings: string;
    /**
     * If `returnChanges` is set to `true`, this will be an array of objects, one for each objected affected by the `insert` operation.
     */
    changes?: ChangeSet<void, T>;
  }

  export interface SyncResult {
    synced: number;
  }

  interface UnionOptions <T> {
    interleave?: boolean | string | ((row: RObject<T>) => RString<string>);
  }


  interface NestedFieldsObject {
    [key: string]: boolean | NestedFieldsSelector;
  }

  type NestedFieldsSelector = string | string[] | NestedFieldsObject | NestedFieldsObject[];

  export interface RTableSlice <T> extends
    RObservable<T>,
    ROperations<T>,
    RConfigurable,
    RObservable<T>,
    RRunable<Cursor<T>>,
    RAny,
    r.Skip,
    r.Limit,
    RCoercable,
    RToJSON,
    r.Avg<T>,
    r.Contains<T>,
    r.Count.Sequence<T>,
    r.Default<T>,
    r.ForEach<T>,
    r.Group<T>,
    r.IsEmpty,
    r.Max<T>,
    r.Min<T>,
    r.OffsetsOf.Stream<T>,
    r.Reduce<T>,
    r.Slice,
    r.Sum<T>,
    RRunable<Cursor<T>>,
    r.Union.Stream<T>,
    r.ConcatMap.Stream<T>,
    r.Filter<T>,
    r.Bracket.Stream,
    r.GetField.Stream,
    r.HasFields<RStream<T>>,
    r.Sample<RArray<T>>,
    r.Nth.Selection<T>,
    r.Map.Sequence<T>,
    r.Distinct.Table<T>,
    r.OrderBy.Table<T> {
    /**
     * Get all documents between two keys. Accepts three optional arguments: `index`, `left_bound`, and `right_bound`. If `index` is set to the name of a secondary index, `between` will return all documents where that index's value is in the specified range (it uses the primary key by default). `left_bound` or `right_bound` may be set to `open` or `closed` to indicate whether or not to include that endpoint of the range (by default, `left_bound` is closed and `right_bound` is open).
     *
     * https://rethinkdb.com/api/javascript/between
     */
    between (lowerKey: KeyType, upperKey: KeyType, options?: BetweenOptions): RTableSlice<T>;
  }

  export interface RTable <T> extends RTableSlice<T> {
    /**
     * Get a document by primary key.
     *
     * If no document exists with that primary key, `get` will return `null`.
     *
     * https://rethinkdb.com/api/javascript/get
     */
    get (key: KeyType): RSingleSelection<T>;

    /**
     * Get all documents where the given value matches the value of the requested index.
     *
     * https://rethinkdb.com/api/javascript/get_all
     */
    getAll (key: KeyType, options?: IndexOptions): RSelection<T>;
    getAll (key: KeyType, ...keys: Array<KeyType>): RSelection<T>;
    getAll (key: KeyType, ...keysAndThenOptions: Array<KeyType | IndexOptions>): RSelection<T>;

    /**
     * Get all documents where the given geometry object intersects the geometry object of the requested geospatial index.
     *
     * https://rethinkdb.com/api/javascript/get_intersecting
     */
    getIntersecting (geometry: RGeometry<any>, options?: { index: string }): RStream<T>;

    /**
     * Get all documents where the specified geospatial index is within a certain distance of the specified point (default 100 kilometers).
     *
     * https://rethinkdb.com/api/javascript/get_nearest
     */
    getNearest (point: RPoint, options?: GetNearestOptions): RArray<GetNearestResult<T>>;

    /**
     * Create a new secondary index on a table.
     *
     * https://rethinkdb.com/api/javascript/index_create
     */
    indexCreate (indexName: r.StringLike<string>, indexFunction: IndexFunction<T>, options?: IndexCreateOptions): RObject<IndexCreateResult>;
    indexCreate (indexName: r.StringLike<string>, options?: IndexCreateOptions): RObject<IndexCreateResult>;

    /**
     * Delete a previously created secondary index of this table.
     *
     * https://rethinkdb.com/api/javascript/index_drop
     */
    indexDrop (indexName: r.StringLike<string>): RObject<any>;

    /**
     * List all the secondary indexes of this table.
     *
     * https://rethinkdb.com/api/javascript/index_list
     */
    indexList (): RArray<string>;

    /**
     * Rename an existing secondary index on a table. If the optional argument `overwrite` is specified as `true`, a previously existing index with the new name will be deleted and the index will be renamed. If `overwrite` is `false` (the default) an error will be raised if the new index name already exists.
     *
     * https://rethinkdb.com/api/javascript/index_rename
     */
    indexRename (oldIndexName: r.StringLike<string>, newIndexName: r.StringLike<string>, options?: IndexRenameOptions): RObject<IndexRenameResult>;

    /**
     * Get the status of the specified indexes on this table, or the status of all indexes on this table if no indexes are specified.
     *
     * https://rethinkdb.com/api/javascript/index_status
     */
    indexStatus (...indexes: Array<string>): RArray<IndexStatusResult>;
    indexStatus (): RArray<IndexStatusResult>;

    /**
     * Wait for the specified indexes on this table to be ready, or for all indexes on this table to be ready if no indexes are specified.
     *
     * https://rethinkdb.com/api/javascript/index_wait
     */
    indexWait (...indexes: Array<string>): RArray<IndexStatusResult>;
    indexWait (): RArray<IndexStatusResult>;

    /**
     * Return the status of a table.
     *
     * https://rethinkdb.com/api/javascript/status
     */
    status (): RSingleSelection<StatusResult>;

    /**
     * `sync` ensures that writes on a given table are written to permanent storage. Queries that specify soft durability (`{durability: 'soft'}`) do not give such guarantees, so `sync` can be used to ensure the state of these queries. A call to `sync` does not return until all previous writes to the table are persisted.
     *
     * https://rethinkdb.com/api/javascript/sync
     */
    sync (): RObject<SyncResult>;
  }

  export interface RBinary extends
    RCoercable,
    RAny,
    r.Count.Datum,
    r.Slice {}

  export interface RToJSON extends RAny {
    /**
     * Convert a ReQL value or object to a JSON string. You may use either `toJsonString` or `toJSON`.
     *
     * https://rethinkdb.com/api/javascript/to_json_string
     */
    toJsonString (): RString<string>;

    /**
     * Convert a ReQL value or object to a JSON string. You may use either `toJsonString` or `toJSON`.
     *
     * https://rethinkdb.com/api/javascript/to_json_string
     */
    toJSON (): RString<string>;
  }

  export interface RExpression {
    <T extends number> (expression: r.NumberLike<T>): RNumber<T>;
    <T extends boolean> (expression: r.BooleanLike<T>): RBoolean<T>;
    <T extends string> (expression: r.StringLike<T>): RString<T>;
    <T extends Array<any>> (expression: r.ArrayLike<T>): RArray<T>;
    <T extends Date> (expression: r.TimeLike): RTime;
    <T extends RNumber<number>> (expression: r.NumberLike<number>): T;
    <T extends RBoolean<boolean>> (expression: r.BooleanLike<boolean>): T;
    <T extends RString<string>> (expression: r.StringLike<string>): T;
    <T extends RArray<any>> (expression: r.ArrayLike<any>): T;
    <T extends RObject<any>> (expression: r.ObjectLike<any>): T;
    <T extends RTime> (expression: r.TimeLike): T;
    <T extends RGeometry<any>> (expression: T): T;
    <T extends {}> (expression: r.ObjectLike<any>): RObject<T>;
  }

  namespace r {
    type NumberLike <T extends number> = (() => T | RValue<T>) | T | RValue<T>;
    type StringLike <T extends string> = (() => T | RValue<T>) | T | RValue<T>;
    type ObjectLike <T extends Object> = (() => T | RValue<T>) | T | RValue<T>;
    type ArrayLike <T> = (() => Array<T> | RArray<T>) | Array<T> | RArray<T>;
    type BooleanLike <T extends boolean> = T | RValue<T>;
    type TimeLike = (() => Date | RTime) | Date | RTime | NumberLike<number>;
    type SequenceLike <T> = RSelection<T> | RTableSlice<T> | RTable<T> | RStream<T> | RArray<T> | RGroupedStream<any, T>;
    type BinaryLike = (() => Buffer | RBinary) | Buffer | RBinary;
    type DatumLike = NumberLike<number> | StringLike<string> | ObjectLike<any> | ArrayLike<any> | BooleanLike<boolean> | TimeLike | BinaryLike;

    interface Add <T> {
      /**
       * Sum two or more numbers, or concatenate two or more strings or arrays.
       *
       * https://rethinkdb.com/api/javascript/add
       */
      add (value: T, ...values: T[]): this;
    }

    interface Sub <T> {
      /**
       * Subtract two numbers.
       *
       * https://rethinkdb.com/api/javascript/sub
       */
      sub (number: T, ...numbers: T[]): this;
    }

    interface Ceil {
      /**
       * Rounds the given value up, returning the smallest integer value greater than or equal to the given value (the value's ceiling).
       *
       * https://rethinkdb.com/api/javascript/ceil
       */
      ceil (): this;
    }

    interface Div {
      /**
       * Divide two numbers.
       *
       * https://rethinkdb.com/api/javascript/div
       */
      div (number: r.NumberLike<number>, ...numbers: Array<r.NumberLike<number>>): this;
      div (number: r.NumberLike<number>): this;
    }

    interface Floor {
      /**
       * Rounds the given value down, returning the largest integer value less than or equal to the given value (the value's floor).
       *
       * https://rethinkdb.com/api/javascript/floor
       */
      floor (): this;
    }

    interface Mod {
      /**
       * Find the remainder when dividing two numbers.
       *
       * https://rethinkdb.com/api/javascript/mod
       */
      mod (number: r.NumberLike<number>): this;
    }

    interface Mul {
      /**
       * Multiply two numbers, or make a periodic array.
       *
       * https://rethinkdb.com/api/javascript/mul
       */
      mul (number: r.NumberLike<number>, ...numbers: Array<r.NumberLike<number>>): this;
      mul (number: r.NumberLike<number>): this;
    }

    interface Round {
      /**
       * Rounds the given value to the nearest whole integer.
       *
       * https://rethinkdb.com/api/javascript/round
       */
      round (): this;
    }

    interface Downcase {
      /**
       * Lowercases a string.
       *
       * https://rethinkdb.com/api/javascript/downcase
       */
      downcase (): this;
    }

    interface Match {
      /**
       * Matches against a regular expression. If there is a match, returns an object with the fields:
       *
       * - `str`: The matched string
       * - `start`: The matched string's start
       * - `end`: The matched string's end
       * - `groups`: The capture groups defined with parentheses
       *
       * If no match is found, returns `null`.
       *
       * https://rethinkdb.com/api/javascript/match
       */
      match (regexp: string): RObject<{ str: string, start: number, end: number, groups: string[] }>;
    }

    interface Split {
      /**
       * Splits a string into substrings. Splits on whitespace when called with no arguments. When called with a separator, splits on that separator. When called with a separator and a maximum number of splits, splits on that separator at most `max_splits` times. (Can be called with `null` as the separator if you want to split on whitespace while still specifying `max_splits`.)
       *
       * Mimics the behavior of Python's `string.split` in edge cases, except for splitting on the empty string, which instead produces an array of single-character strings.
       *
       * https://rethinkdb.com/api/javascript/split
       */
      split (separator?: string, max_splits?: number): RArray<string>;
    }

    interface Upcase {
      /**
       * Uppercases a string.
       *
       * https://rethinkdb.com/api/javascript/upcase
       */
      upcase (): this;
    }

    interface Append <T> {
      /**
       * Append a value to an array.
       *
       * https://rethinkdb.com/api/javascript/append
       */
      append (value: T): this;
    }

    interface ChangeAt <T> {
      /**
       * Change a value in an array at a given index. Returns the modified array.
       *
       * https://rethinkdb.com/api/javascript/change_at
       */
      changeAt (index: r.NumberLike<number>, value: T): RArray<T>;
    }

    interface DeleteAt <T> {
      /**
       * Remove one or more elements from an array at a given index. Returns the modified array.
       *
       * https://rethinkdb.com/api/javascript/delete_at
       */
      deleteAt (index: r.NumberLike<number>, endIndex?: r.NumberLike<number>): RArray<T>;
    }

    interface Difference <T> {
      /**
       * Remove the elements of one array from another array.
       *
       * https://rethinkdb.com/api/javascript/difference
       */
      difference (array: r.ArrayLike<T>): RArray<T>;
    }

    interface InsertAt <T> {
      /**
       * Insert a value in to an array at a given index. Returns the modified array.
       *
       * https://rethinkdb.com/api/javascript/insert_at
       */
      insertAt (index: r.NumberLike<number>, value: T): RArray<T>;
    }

    namespace Map {
      interface Array <T> {
        /**
         * Transform each element of one or more sequences by applying a mapping function to them. If `map` is run with two or more sequences, it will iterate for as many items as there are in the shortest sequence.
         *
         * https://rethinkdb.com/api/javascript/map
         */
        map <Out> (mappingExpression: RValue<Out> | ((item: RDatum<T>) => Out)): RArray<Out>;
      }

      interface Sequence <T> {
        /**
         * Transform each element of one or more sequences by applying a mapping function to them. If `map` is run with two or more sequences, it will iterate for as many items as there are in the shortest sequence.
         *
         * https://rethinkdb.com/api/javascript/map
         */
        map <Out> (mappingExpression: RValue<Out> | ((item: RDatum<T>) => Out)): RStream<Out>;
      }
    }

    interface Prepend <T> {
      /**
       * Prepend a value to an array.
       *
       * https://rethinkdb.com/api/javascript/prepend
       */
      prepend (value: T): RArray<T>;
    }

    interface SetDifference <T> {
      /**
       * Remove the elements of one array from another and return them as a set (an array with distinct values).
       *
       * https://rethinkdb.com/api/javascript/set_difference
       */
      setDifference (array: r.ArrayLike<T>): RArray<T>;
    }

    interface SetInsert <T> {
      /**
       * Add a value to an array and return it as a set (an array with distinct values).
       *
       * https://rethinkdb.com/api/javascript/set_insert
       */
      setInsert (value: T): RArray<T>;
    }

    interface SetIntersection <T> {
      /**
       * Intersect two arrays returning values that occur in both of them as a set (an array with distinct values).
       *
       * https://rethinkdb.com/api/javascript/set_intersection
       */
      setIntersection (array: r.ArrayLike<T>): RArray<T>;
    }

    interface SetUnion <T> {
      /**
       * Add a several values to an array and return it as a set (an array with distinct values).
       *
       * https://rethinkdb.com/api/javascript/set_union
       */
      setUnion (array: r.ArrayLike<T>): RArray<T>;
    }

    interface SpliceAt <T> {
      /**
       * Insert several values in to an array at a given index. Returns the modified array.
       *
       * https://rethinkdb.com/api/javascript/splice_at
       */
      spliceAt (index: r.NumberLike<number>, array: r.ArrayLike<T>): RArray<T>;
    }

    interface Zip <TOutJoin> {
      /**
       * Used to 'zip' up the result of a join by merging the 'right' fields into 'left' fields of each member of the sequence.
       *
       * https://rethinkdb.com/api/javascript/zip
       */
      zip (): TOutJoin;
    }

    interface Date {
      /**
       * Return a new time object only based on the day, month and year (ie. the same day at 00:00).
       *
       * https://rethinkdb.com/api/javascript/date
       */
      date (): RTime;
    }

    interface Day {
      /**
       * Return the day of a time object as a number between 1 and 31.
       *
       * https://rethinkdb.com/api/javascript/day
       */
      day (): RNumber<number>;
    }

    interface DayOfWeek {
      /**
       * Return the day of week of a time object as a number between 1 and 7 (following ISO 8601 standard). For your convenience, the terms r.monday, r.tuesday etc. are defined and map to the appropriate integer.
       *
       * https://rethinkdb.com/api/javascript/day_of_week
       */
      dayOfWeek (): RNumber<number>;
    }

    interface DayOfYear {
      /**
       * Return the day of the year of a time object as a number between 1 and 366 (following ISO 8601 standard).
       *
       * https://rethinkdb.com/api/javascript/day_of_year
       */
      dayOfYear(): RNumber<number>;
    }

    interface During {
      /**
       * Return if a time is between two other times (by default, inclusive for the start, exclusive for the end).
       *
       * https://rethinkdb.com/api/javascript/during
       */
      during (startTime: r.TimeLike, endTime: r.TimeLike, options?: BoundOptions): RBoolean<boolean>;
    }

    interface Hours {
      /**
       * Return the hour in a time object as a number between 0 and 23.
       *
       * https://rethinkdb.com/api/javascript/hours
       */
      hours (): RNumber<number>;
    }

    interface InTimezone {
      /**
       * Return a new time object with a different timezone. While the time stays the same, the results returned by methods such as hours() will change since they take the timezone into account. The timezone argument has to be of the ISO 8601 format.
       *
       * https://rethinkdb.com/api/javascript/in_timezone
       */
      inTimezone (timezone: r.StringLike<string>): RTime;
    }

    interface Seconds {
      /**
       * Return the seconds in a time object as a number between 0 and 59.999 (double precision).
       *
       * https://rethinkdb.com/api/javascript/seconds
       */
      seconds (): RNumber<number>;
    }

    interface Minutes {
      /**
       * Return the minute in a time object as a number between 0 and 59.
       *
       * https://rethinkdb.com/api/javascript/minutes
       */
      minutes (): RNumber<number>;
    }

    interface Month {
      /**
       * Return the month of a time object as a number between 1 and 12. For your convenience, the terms `r.january`, `r.february`, etc. are defined and map to the appropriate integer.
       *
       * https://rethinkdb.com/api/javascript/month
       */
      month (): RNumber<number>;
    }

    interface Year {
      /**
       * Return the year of a time object.
       *
       * https://rethinkdb.com/api/javascript/year
       */
      year (): RNumber<number>;
    }

    interface TimeOfDay {
      /**
       * Return the number of seconds elapsed since the beginning of the day stored in the time object.
       *
       * https://rethinkdb.com/api/javascript/time_of_day
       */
      timeOfDay (): RNumber<number>;
    }

    interface Timezone {
      /**
       * Return the timezone of the time object.
       *
       * https://rethinkdb.com/api/javascript/timezone
       */
      timezone (): RString<string>;
    }

    interface ToEpochTime {
      /**
       * Convert a time object to its epoch time.
       *
       * https://rethinkdb.com/api/javascript/to_epoch_time
       */
      toEpochTime (): RNumber<number>;
    }

    interface ToISO8601 {
      /**
       * Convert a time object to a string in ISO 8601 format.
       *
       * https://rethinkdb.com/api/javascript/to_iso8601
       */
      toISO8601 (): RString<string>;
    }

    interface And {
      /**
       * Compute the logical "and" of one or more values.
       *
       * https://rethinkdb.com/api/javascript/and
       */
      and (...bools: Array<r.BooleanLike<boolean>>): RBoolean<boolean>;
    }

    interface Not {
      /**
       * Compute the logical inverse (not) of an expression.
       *
       * `not` can be called either via method chaining, immediately after an expression that evaluates as a boolean value, or by passing the expression as a parameter to `not`.
       *
       * https://rethinkdb.com/api/javascript/not
       */
      not(): RBoolean<boolean>;
    }

    interface Or {
      /**
       * Compute the logical "or" of one or more values.
       *
       * https://rethinkdb.com/api/javascript/or
       */
      or (...bools: Array<r.BooleanLike<boolean>>): RBoolean<boolean>;
    }

    namespace Pluck {
      interface Array {
        /**
         * Plucks out one or more attributes from either an object or a sequence of objects (projection).
         *
         * https://rethinkdb.com/api/javascript/pluck
         */
        pluck <TPluck> (...selectors: r.StringLike<string>[]): RArray<TPluck>;
      }

      interface Sequence {
        /**
         * Plucks out one or more attributes from either an object or a sequence of objects (projection).
         *
         * https://rethinkdb.com/api/javascript/pluck
         */
        pluck <TPluck> (...selectors: r.StringLike<string>[]): RStream<TPluck>;
      }

      interface Object {
        /**
         * Plucks out one or more attributes from either an object or a sequence of objects (projection).
         *
         * https://rethinkdb.com/api/javascript/pluck
         */
        pluck <TPluck> (...selectors: r.StringLike<string>[]): RObject<TPluck>;
      }
    }

    interface BracketsPluckSequence {
      /**
       * Get a single field from an object or a single element from a sequence.
       *
       * https://rethinkdb.com/api/javascript/bracket
       */
      <TPluck> (attr: r.StringLike<string>): RArray<TPluck>;
    }

    namespace Without {
      interface Array {
        /**
         * The opposite of pluck; takes an object or a sequence of objects, and returns them with the specified paths removed.
         *
         * https://rethinkdb.com/api/javascript/without
         */
        without <TWithout> (...selectors: r.StringLike<string>[]): RArray<TWithout>;
      }

      interface Sequence {
        /**
         * The opposite of pluck; takes an object or a sequence of objects, and returns them with the specified paths removed.
         *
         * https://rethinkdb.com/api/javascript/without
         */
        without <TWithout> (...selectors: r.StringLike<string>[]): RStream<TWithout>;
      }

      interface Object {
        /**
         * The opposite of pluck; takes an object or a sequence of objects, and returns them with the specified paths removed.
         *
         * https://rethinkdb.com/api/javascript/without
         */
        without <TWithout> (...selectors: r.StringLike<string>[]): RObject<TWithout>;
      }
    }

    namespace ConcatMap {
      type ConcatFunction <TItem, TOut> = (item: RObject<TItem>) => TOut;

      interface Array <T> {
        /**
         * Concatenate one or more elements into a single sequence using a mapping function.
         *
         * https://rethinkdb.com/api/javascript/concat_map
         */
        concatMap <Out> (concatFunction: ConcatFunction<T, r.ArrayLike<Out>>): RArray<Out>;
      }

      interface Stream <T> {
        /**
         * Concatenate one or more elements into a single sequence using a mapping function.
         *
         * https://rethinkdb.com/api/javascript/concat_map
         */
        concatMap <Out> (concatFunction: ConcatFunction<T, r.SequenceLike<Out>>): RStream<Out>;
      }
    }

    namespace EqJoin {
      interface array<T> {
        /**
         * Join tables using a field or function on the left-hand sequence matching primary keys or secondary indexes on the right-hand table. `eqJoin` is more efficient than other ReQL join types, and operates much faster. Documents in the result set consist of pairs of left-hand and right-hand documents, matched when the field on the left-hand side exists and is non-null and an entry with that field's value exists in the specified index on the right-hand side.
         *
         * https://rethinkdb.com/api/javascript/eq_join
         */
        eqJoin <TRight> (leftField: r.StringLike<string>, rightTable: RTable<TRight>, options?: JoinOptions): RArrayJoin<T, TRight>;
        eqJoin <TLeft, TRight> (predicate_function: (item: RObject<T>) => TLeft, rightTable: RTable<TRight>, options?: JoinOptions): RArrayJoin<TLeft, TRight>;
      }

      interface Stream <T> {
        /**
         * Join tables using a field or function on the left-hand sequence matching primary keys or secondary indexes on the right-hand table. `eqJoin` is more efficient than other ReQL join types, and operates much faster. Documents in the result set consist of pairs of left-hand and right-hand documents, matched when the field on the left-hand side exists and is non-null and an entry with that field's value exists in the specified index on the right-hand side.
         *
         * https://rethinkdb.com/api/javascript/eq_join
         */
        eqJoin <TRight> (leftField: r.StringLike<string>, rightTable: RTable<TRight>, options?: JoinOptions): RStreamJoin<T, TRight>;
        eqJoin <TLeft, TRight> (predicate_function: (item: RObject<T>) => TLeft, rightTable: RTable<TRight>, options?: JoinOptions): RStreamJoin<TLeft, TRight>;
      }
    }

    interface FilterObject {
      [key: string]: r.DatumLike | FilterObject;
    }

    type FilterPredicate <T> = ((item: RDatum<T>) => RBoolean<boolean>) | FilterObject | RBoolean<boolean>;

    interface Filter <T> {
      /**
       * Get all the documents for which the given predicate is true.
       *
       * `filter` can be called on a sequence, selection, or a field containing an array of elements. The return type is the same as the type on which the function was called on.
       *
       * The body of every filter is wrapped in an implicit `.default(false)`, which means that if a non-existence errors is thrown (when you try to access a field that does not exist in a document), RethinkDB will just ignore the document. The `default` value can be changed by passing an object with a `default` field. Setting this optional argument to `r.error()` will cause any non-existence errors to return a `ReqlRuntimeError`.
       *
       * https://rethinkdb.com/api/javascript/filter
       */
      filter (predicate: FilterPredicate<T>, options?: { default: boolean | RError }): this;
    }

    interface Distinct <TOut> {
      /**
       * Remove duplicate elements from the sequence.
       *
       * https://rethinkdb.com/api/javascript/distinct
       */
      distinct (options?: IndexOptions): TOut;
    }

    interface HasFields <TOut> {
      /**
       * Test if an object has one or more fields. An object has a field if it has that key and the key has a non-null value. For instance, the object `{'a': 1,'b': 2,'c': null}` has the fields `a` and `b`.
       *
       * https://rethinkdb.com/api/javascript/has_fields
       */
      hasFields (...selectors: NestedFieldsSelector[]): TOut;
    }

    type JoinPredicate <TLeft, TRight> = (left: RObject<TLeft>, right: RObject<TRight>) => RBoolean<boolean>;

    namespace InnerJoin {
      interface Array <T> {
        /**
         * Returns an inner join of two sequences.
         *
         * https://rethinkdb.com/api/javascript/inner_join
         */
        innerJoin <TRight> (otherSequence: r.SequenceLike<TRight>, predicate_function: JoinPredicate<T, TRight>): RArrayJoin<T, TRight>;
      }

      interface Stream <T> {
        /**
         * Returns an inner join of two sequences.
         *
         * https://rethinkdb.com/api/javascript/inner_join
         */
        innerJoin <TRight> (otherSequence: r.SequenceLike<TRight>, predicate_function: JoinPredicate<T, TRight>): RStreamJoin<T, TRight>;
      }
    }

    interface Limit {
      /**
       * End the sequence after the given number of elements.
       *
       * https://rethinkdb.com/api/javascript/limit
       */
      limit (n: r.NumberLike<number>): this;
    }

    namespace Merge {
      type MergeParam <T> = RSingleSelection<any> | ((item: RObject<T>) => (RObject<any> | { [key: string]: any }));

      interface Array <T> {
        /**
         * Merge two or more objects together to construct a new object with properties from all. When there is a conflict between field names, preference is given to fields in the rightmost object in the argument list.
         *
         * https://rethinkdb.com/api/javascript/merge
         */
        merge <TOut> (...objectsOrFunctions: MergeParam<T>[]): RArray<TOut>;
      }

      interface Stream <T> {
        /**
         * Merge two or more objects together to construct a new object with properties from all. When there is a conflict between field names, preference is given to fields in the rightmost object in the argument list.
         *
         * https://rethinkdb.com/api/javascript/merge
         */
        merge <TOut> (...objectOrFunctions: MergeParam<T>[]): RStream<TOut>;
      }

      interface Object <T> {
        /**
         * Merge two or more objects together to construct a new object with properties from all. When there is a conflict between field names, preference is given to fields in the rightmost object in the argument list.
         *
         * https://rethinkdb.com/api/javascript/merge
         */
        merge <TOut> (...objectOrFunctions: MergeParam<T>[]): RObject<TOut>;
      }
    }

    namespace OrderBy {
      type OrderByParam <T> = KeyType | ((item: RObject<T>) => RValue<any> | KeyType);

      interface Table <T> {
        /**
         * Sort the sequence by document values of the given key(s). To specify the ordering, wrap the attribute with either `r.asc` or `r.desc` (defaults to ascending).
         *
         * Sorting without an index requires the server to hold the sequence in memory, and is limited to 100,000 documents (or the setting of the `arrayLimit` option for [run](/api/javascript/run)). Sorting with an index can be done on arbitrarily large tables, or after a `between` command using the same index.
         *
         * https://rethinkdb.com/api/javascript/order_by
         */
        orderBy (keysOrFunctions: OrderByParam<T>, ...moreKeysFunctionsOrOptions: (OrderByParam<T> | { index: r.StringLike<string> })[]): RTableSlice<T>;
        orderBy (options: { index: r.StringLike<string> }): RTableSlice<T>;
      }

      export interface Selection <T> {
        /**
         * Sort the sequence by document values of the given key(s). To specify the ordering, wrap the attribute with either `r.asc` or `r.desc` (defaults to ascending).
         *
         * Sorting without an index requires the server to hold the sequence in memory, and is limited to 100,000 documents (or the setting of the `arrayLimit` option for [run](/api/javascript/run)). Sorting with an index can be done on arbitrarily large tables, or after a `between` command using the same index.
         *
         * https://rethinkdb.com/api/javascript/order_by
         */
        orderBy (keyOrFunction: OrderByParam<T>, ...moreKeysOrFunctions: OrderByParam<T>[]): RSelection<T>;
      }

      export interface Sequence <T> {
        /**
         * Sort the sequence by document values of the given key(s). To specify the ordering, wrap the attribute with either `r.asc` or `r.desc` (defaults to ascending).
         *
         * Sorting without an index requires the server to hold the sequence in memory, and is limited to 100,000 documents (or the setting of the `arrayLimit` option for [run](/api/javascript/run)). Sorting with an index can be done on arbitrarily large tables, or after a `between` command using the same index.
         *
         * https://rethinkdb.com/api/javascript/order_by
         */
        orderBy (keyOrFunction: OrderByParam<T>, ...moreKeysOrFunctions: OrderByParam<T>[]): RArray<T>;
      }
    }

    namespace OuterJoin {
      interface Array<T> {
        /**
         * Returns a left outer join of two sequences.
         *
         * https://rethinkdb.com/api/javascript/outer_join
         */
        outerJoin <Right> (otherSequence: r.SequenceLike<Right>, predicateFunction: JoinPredicate<T, Right>): RArrayJoin<T, Right>;
      }

      interface Sequence<T> {
        /**
         * Returns a left outer join of two sequences.
         *
         * https://rethinkdb.com/api/javascript/outer_join
         */
        outerJoin <Right> (otherSequence: r.SequenceLike<Right>, predicateFunction: JoinPredicate<T, Right>): RStreamJoin<T, Right>;
      }
    }

    interface Sample <TOut> {
      /**
       * Select a given number of elements from a sequence with uniform random distribution. Selection is done without replacement.
       *
       * https://rethinkdb.com/api/javascript/sample
       */
      sample (number: r.NumberLike<number>): TOut;
    }

    interface Skip {
      /**
       * Skip a number of elements from the head of the sequence.
       *
       * https://rethinkdb.com/api/javascript/skip
       */
      skip (n: r.NumberLike<number>): this;
    }

    interface Slice {
      /**
       * Return the elements of a sequence within the specified range.
       *
       * https://rethinkdb.com/api/javascript/slice
       */
      slice (startOffset: r.NumberLike<number>, endOffset: r.NumberLike<number>, options?: BoundOptions): this;
      slice (startOffset: r.NumberLike<number>): this;
    }

    namespace Union {
      interface Stream <T> {
        /**
         * Merge two or more sequences.
         *
         * https://rethinkdb.com/api/javascript/union
         */
        union <Other> (sequence: r.SequenceLike<Other>, ...sequencesOrOptions: (r.SequenceLike<Other> | UnionOptions<T>)[]): RStream<T | Other>;
        union <Other> (sequence: r.SequenceLike<Other>, options?: UnionOptions<T>): RStream<T | Other>;
      }

      interface Array <T> {
        /**
         * Merge two or more sequences.
         *
         * https://rethinkdb.com/api/javascript/union
         */
        union <Other> (sequence: r.SequenceLike<Other>, ...sequencesOrOptions: (r.SequenceLike<Other> | UnionOptions<T>)[]): RArray<T | Other>;
        union <Other> (sequence: r.SequenceLike<Other>, options?: UnionOptions<T>): RArray<T | Other>;
      }
    }

    namespace WithFields {
      interface Array {
        /**
         * Plucks one or more attributes from a sequence of objects, filtering out any objects in the sequence that do not have the specified fields. Functionally, this is identical to `hasFields` followed by `pluck` on a sequence.
         *
         * https://rethinkdb.com/api/javascript/with_fields
         */
        withFields <T> (...selectors: NestedFieldsSelector[]): RArray<T>;
      }

      interface Stream {
        /**
         * Plucks one or more attributes from a sequence of objects, filtering out any objects in the sequence that do not have the specified fields. Functionally, this is identical to `hasFields` followed by `pluck` on a sequence.
         *
         * https://rethinkdb.com/api/javascript/with_fields
         */
        withFields <T> (...selectors: NestedFieldsSelector[]): r.SequenceLike<T>;
      }
    }

    namespace Distinct {
      interface Sequence <T> {
        /**
         * Remove duplicate elements from the sequence.
         *
         * https://rethinkdb.com/api/javascript/distinct
         */
        distinct (): RArray<T>;
      }

      interface Table <T> {
        /**
         * Remove duplicate elements from the sequence.
         *
         * https://rethinkdb.com/api/javascript/distinct
         */
        distinct (options?: { index: string }): RStream<T>;
      }
    }

    namespace Bracket {
      export interface Object {
        /**
         * Get a single field from an object or a single element from a sequence.
         *
         * https://rethinkdb.com/api/javascript/bracket
         */
        <T> (attr: r.StringLike<string>): RDatum<T>;
      }

      export interface Stream {
        /**
         * Get a single field from an object or a single element from a sequence.
         *
         * https://rethinkdb.com/api/javascript/bracket
         */
        <T> (attr: r.StringLike<string>): RStream<T>;
      }

      export interface Array <In> {
        /**
         * Get a single field from an object or a single element from a sequence.
         *
         * https://rethinkdb.com/api/javascript/bracket
         */
        <Out> (attr: r.StringLike<string>): RArray<Out>;
        (index: r.NumberLike<number>): RDatum<In>;
      }

      export interface Datum <T> {
        /**
         * Get a single field from an object or a single element from a sequence.
         *
         * https://rethinkdb.com/api/javascript/bracket
         */
        <T> (attr: r.StringLike<string>): RDatum<T>;
        (index: r.NumberLike<number>): RDatum<T>;
      }
    }

    namespace GetField {
      export interface Object {
        /**
         * Get a single field from an object. If called on a sequence, gets that field from every object in the sequence, skipping objects that lack it.
         *
         * https://rethinkdb.com/api/javascript/get_field
         */
        getField <T> (attr: r.StringLike<string>): RDatum<T>;
      }

      interface Array <T> {
        /**
         * Get a single field from an object. If called on a sequence, gets that field from every object in the sequence, skipping objects that lack it.
         *
         * https://rethinkdb.com/api/javascript/get_field
         */
        getField <T> (attr: r.StringLike<string>): RArray<T>;
      }

      interface Stream {
        /**
         * Get a single field from an object. If called on a sequence, gets that field from every object in the sequence, skipping objects that lack it.
         *
         * https://rethinkdb.com/api/javascript/get_field
         */
        getField: Bracket.Stream;
      }
    }

    namespace Includes {
      interface Sequence {
        /**
         * Tests whether a geometry object is completely contained within another. When applied to a sequence of geometry objects, `includes` acts as a [filter](https://rethinkdb.com/api/javascript/filter), returning a sequence of objects from the sequence that include the argument.
         *
         * https://rethinkdb.com/api/javascript/includes
         */
        includes (geometry: RGeometry<any>): this;
      }

      interface Geometry {
        /**
         * Tests whether a geometry object is completely contained within another. When applied to a sequence of geometry objects, `includes` acts as a [filter](https://rethinkdb.com/api/javascript/filter), returning a sequence of objects from the sequence that include the argument.
         *
         * https://rethinkdb.com/api/javascript/includes
         */
        includes (geometry: RGeometry<any>): RBoolean<boolean>;
      }
    }

    namespace Intersects {
      interface Sequence {
        /**
         * Tests whether two geometry objects intersect with one another. When applied to a sequence of geometry objects, `intersects` acts as a [filter](https://rethinkdb.com/api/javascript/filter), returning a sequence of objects from the sequence that intersect with the argument.
         *
         * https://rethinkdb.com/api/javascript/intersects
         */
        intersects (geometry: RGeometry<any>): this;
      }

      interface Geometry {
        /**
         * Tests whether two geometry objects intersect with one another. When applied to a sequence of geometry objects, `intersects` acts as a [filter](https://rethinkdb.com/api/javascript/filter), returning a sequence of objects from the sequence that intersect with the argument.
         *
         * https://rethinkdb.com/api/javascript/intersects
         */
        intersects (geometry: RGeometry<any>): RBoolean<boolean>;
      }
    }

    interface Avg <T> {
      /**
       * Averages all the elements of a sequence. If called with a field name, averages all the values of that field in the sequence, skipping elements of the sequence that lack that field. If called with a function, calls that function on every element of the sequence and averages the results, skipping elements of the sequence where that function returns `null` or a non-existence error.
       *
       * https://rethinkdb.com/api/javascript/avg
       */
      avg (): RNumber<number>;
      avg (field: r.StringLike<string>): RNumber<number>;
      avg (func: (item: RObject<T>) => RNumber<number>): RNumber<number>;
    }

    interface Contains <T> {
      /**
       * Returns whether or not a sequence contains all the specified values, or if functions are provided instead, returns whether or not a sequence contains values matching all the specified functions.
       *
       * https://rethinkdb.com/api/javascript/contains
       */
      contains (...valuesOrFunctions: Array<FilterPredicate<T> | RValue<any> | string>): RBoolean<boolean>;
    }

    namespace Count {
      interface Sequence <T> {
        /**
         * Count the number of elements in the sequence. With a single argument, count the number of elements equal to it. If the argument is a function, it is equivalent to calling filter before count.
         *
         * https://rethinkdb.com/api/javascript/count
         */
        count (predicateFunction: FilterPredicate<T>): RNumber<number>;
        count (equalTo: T): RNumber<number>;
        count (): RNumber<number>;
      }

      interface Datum {
        /**
         * Count the number of elements in the sequence. With a single argument, count the number of elements equal to it. If the argument is a function, it is equivalent to calling filter before count.
         *
         * https://rethinkdb.com/api/javascript/count
         */
        count (): RNumber<number>;
      }
    }

    interface Default <T> {
      /**
       * Provide a default value in case of non-existence errors. The `default` command evaluates its first argument (the value it's chained to). If that argument returns `null` or a non-existence error is thrown in evaluation, then `default` returns its second argument. The second argument is usually a default value, but it can be a function that returns a value.
       *
       * https://rethinkdb.com/api/javascript/default
       */
      default (defaultValue: T | RValue<T>): this;
      default (onError: (error: RError) => T | RValue<T>): this;
    }

    interface Keys {
      /**
       * Return an array containing all of an object's keys. Note that the keys will be sorted as described in [ReQL data types](https://rethinkdb.com/docs/data-types/#sorting-order) (for strings, lexicographically).
       *
       * https://rethinkdb.com/api/javascript/keys
       */
      keys (): RArray<string>;
    }

    interface Values <T> {
      /**
       * Return an array containing all of an object's values. `values()` guarantees the values will come out in the same order as [keys](https://rethinkdb.com/api/javascript/keys).
       *
       * https://rethinkdb.com/api/javascript/values
       */
      values (): RArray<T>;
    }

    interface ForEach <T> {
      /**
       * Loop over a sequence, evaluating the given write query for each element.
       *
       * https://rethinkdb.com/api/javascript/for_each
       */
      forEach <T extends WriteResult<number, number, number, number, number>> (writeFunction: (item: RValue<T> | RObject<T>) => RObject<T>): RObject<T>;
    }

    export interface GroupOptions {
      index: string;
      multi?: boolean;
    }

    export type GroupPredicate <T, Group> = r.StringLike<string> | ((row: RObject<T>) => RValue<Group>);

    interface Group <T> {
      /**
       * Takes a stream and partitions it into multiple groups based on the fields or functions provided. Commands chained after `group` will be called on each of these grouped sub-streams, producing grouped data.
       *
       * https://rethinkdb.com/api/javascript/group
       */
      group <Group> (field: GroupPredicate<T, Group>, options?: GroupOptions): RGroupedStream<Group, T>;
      group <Group> (field: GroupPredicate<T, Group>, field2: GroupPredicate<T, Group>, options?: GroupOptions): RGroupedStream<Group, T>;
      group <Group> (field: GroupPredicate<T, Group>, field2: GroupPredicate<T, Group>, field3: GroupPredicate<T, Group>, options?: GroupOptions): RGroupedStream<Group, T>;
      group <Group> (field: GroupPredicate<T, Group>, field2: GroupPredicate<T, Group>, field3: GroupPredicate<T, Group>, field4: GroupPredicate<T, Group>, options?: GroupOptions): RGroupedStream<Group, T>;
      group <Group> (...fieldOrFunction: (GroupPredicate<T, Group> | GroupOptions)[]): RGroupedStream<Group, T>;
    }

    interface IsEmpty {
      /**
       * Test if a sequence is empty.
       *
       * https://rethinkdb.com/api/javascript/is_empty
       */
      isEmpty (): RBoolean<boolean>;
    }

    interface Max <T> {
      /**
       * Finds the maximum element of a sequence.
       *
       * https://rethinkdb.com/api/javascript/max
       */
      max (fieldOrFunction: r.StringLike<string> | ((row: RObject<T>) => RNumber<number>)): RValue<T>;
      max (options?: { index: string }): RValue<T>;
    }

    interface Min<T> {
      /**
       * Finds the minimum element of a sequence.
       *
       * https://rethinkdb.com/api/javascript/min
       */
      max (fieldOrFunction: r.StringLike<string> | ((row: RObject<T>) => RNumber<number>)): RValue<T>;
      max (options?: { index: string }): RValue<T>;
    }

    namespace Nth {
      interface Sequence <T> {
        /**
         * Get the _nth_ element of a sequence, counting from zero. If the argument is negative, count from the last element.
         *
         * https://rethinkdb.com/api/javascript/nth
         */
        nth (index: r.NumberLike<number>): RObject<T>;
      }

      interface Selection <T> {
        /**
         * Get the _nth_ element of a sequence, counting from zero. If the argument is negative, count from the last element.
         *
         * https://rethinkdb.com/api/javascript/nth
         */
        nth (index: r.NumberLike<number>): RSingleSelection<T>;
      }
    }

    namespace OffsetsOf {
      interface Sequence <T> {
        /**
         * Get the indexes of an element in a sequence. If the argument is a predicate, get the indexes of all elements matching it.
         *
         * https://rethinkdb.com/api/javascript/offsets_of
         */
        offsetsOf (predicateFunction: (item: RDatum<T>) => RBoolean<boolean>): RArray<number>;
        offsetsOf (datum: r.DatumLike): RArray<number>;
      }

      interface Stream <T> {
        /**
         * Get the indexes of an element in a sequence. If the argument is a predicate, get the indexes of all elements matching it.
         *
         * https://rethinkdb.com/api/javascript/offsets_of
         */
        offsetsOf (predicateFunction: (item: RDatum<T>) => RBoolean<boolean>): RStream<number>;
        offsetsOf (datum: r.DatumLike): RStream<number>;
      }
    }

    type ReductionFunction <In, Out> = (left: RDatum<In>, right: RDatum<In>) => Out;

    interface Reduce <T> {
      /**
       * Produce a single value from a sequence through repeated application of a reduction function.
       *
       * https://rethinkdb.com/api/javascript/reduce
       */
      reduce <TOut extends number> (reduceFunction: ReductionFunction<T, TOut>): RNumber<TOut>;
      reduce <TOut extends string> (reduceFunction: ReductionFunction<T, TOut>): RString<TOut>;
      reduce <TOut extends Array<any>> (reduceFunction: ReductionFunction<T, TOut>): RArray<TOut>;
      reduce <TOut extends Object> (reduceFunction: ReductionFunction<T, TOut>): RObject<TOut>;
      reduce <TOut> (reduceFunction: ReductionFunction<T, TOut>): RValue<TOut>;
    }

    interface Sum <T> {
      /**
       * Sums all the elements of a sequence. If called with a field name, sums all the values of that field in the sequence, skipping elements of the sequence that lack that field. If called with a function, calls that function on every element of the sequence and sums the results, skipping elements of the sequence where that function returns `null` or a non-existence error.
       *
       * https://rethinkdb.com/api/javascript/sum
       */
      sum (fieldOrFunction?: r.StringLike<string> | ((item: RObject<T>) => RNumber<number>)): RNumber<number>;
    }

    interface Operators <T> {
      /**
       * Test if two or more values are equal.
       *
       * https://rethinkdb.com/api/javascript/eq
       */
      eq (value: any, ...values: Array<any>): RBoolean<boolean>;

      /**
       * Compare values, testing if the left-hand value is greater than or equal to the right-hand.
       *
       * https://rethinkdb.com/api/javascript/ge
       */
      ge (value: any, ...values: Array<any>): RBoolean<boolean>;

      /**
       * Compare values, testing if the left-hand value is greater than the right-hand.
       *
       * https://rethinkdb.com/api/javascript/gt
       */
      gt (value: any, ...values: Array<any>): RBoolean<boolean>;

      /**
       * Compare values, testing if the left-hand value is less than or equal to the right-hand.
       *
       * https://rethinkdb.com/api/javascript/le
       */
      le (value: any, ...values: Array<any>): RBoolean<boolean>;

      /**
       * Compare values, testing if the left-hand value is less than the right-hand.
       *
       * https://rethinkdb.com/api/javascript/lt
       */
      lt (value: any, ...values: Array<any>): RBoolean<boolean>;

      /**
       * Test if two or more values are not equal.
       *
       * https://rethinkdb.com/api/javascript/ne
       */
      ne (value: any, ...values: Array<any>): RBoolean<boolean>;
    }
  }

  export interface RGeometry <T> extends
    RValue<T>,
    r.Intersects.Geometry,
    r.Includes.Geometry {
    /**
     * Compute the distance between a point and another geometry object. At least one of the geometry objects specified must be a point.
     *
     * https://rethinkdb.com/api/javascript/distance
     */
    distance (geometry: RGeometry<T>, options?: DistanceOptions): RNumber<number>;

    /**
     * Convert a ReQL geometry object to a [GeoJSON](http://geojson.org/) object.
     *
     * https://rethinkdb.com/api/javascript/to_geojson
     */
    toGeojson (): RObject<any>;
  }

  export interface RPolygon extends RGeometry<Array<[number, number]>> {
    /**
     * Use `polygon2` to "punch out" a hole in `polygon1`. `polygon2` must be completely contained within `polygon1` and must have no holes itself (it must not be the output of `polygonSub` itself).
     *
     * https://rethinkdb.com/api/javascript/polygon_sub
     */
    polygonSub (polygon2: RPolygon): RPolygon;
  }

  export interface RLine extends RGeometry<Array<number>> {
    /**
     * Convert a Line object into a Polygon object. If the last point does not specify the same coordinates as the first point, `polygon` will close the polygon by connecting them.
     *
     * https://rethinkdb.com/api/javascript/fill
     */
    fill (): RPolygon;
  }

  export interface RPoint extends RGeometry<[number, number]> {}

  export interface RGroupedStream <Group, Reduction> extends RStream<GroupResult<Group, Reduction>> {
    /**
     * Takes a grouped stream or grouped data and turns it into an array of objects representing the groups. Any commands chained after `ungroup` will operate on this array, rather than operating on each group individually. This is useful if you want to e.g. order the groups by the value of their reduction.
     *
     * https://rethinkdb.com/api/javascript/ungroup
     */
    ungroup (): RArray<GroupResult<Group, Reduction>>;
  }

  export interface RObservable <T> {
    /**
     * Return a changefeed, an infinite stream of objects representing changes to a query. A changefeed may return changes to a table or an individual document (a "point" changefeed), and document transformation commands such as `filter` or `map` may be used before the `changes` command to affect the output.
     *
     * https://rethinkdb.com/api/javascript/changes
     */
    changes (options?: StreamOptions): RStream<ChangeFeed<T> | ChangeState>;
  }

  export interface ROperations <T> extends RAny {
    /**
     * Delete one or more documents from a table.
     *
     * https://rethinkdb.com/api/javascript/delete
     */
    delete (options?: WriteOptions): RObject<DeleteResult<T>>;

    /**
     * Insert JSON documents into a table. Accepts a single JSON document or an array of documents.
     *
     * https://rethinkdb.com/api/javascript/insert
     */
    insert (object: T, options?: InsertOptions<T>): RObject<InsertResult<T>>;
    insert (...objectsOrOptions: Array<T | InsertOptions<T>>): RObject<InsertResult<T>>;

    /**
     * Replace documents in a table. Accepts a JSON document or a ReQL expression, and replaces the original document with the new one. The new document must have the same primary key as the original document.
     *
     * https://rethinkdb.com/api/javascript/replace
     */
    replace (objectOrFunction: T | ((item: RObject<T>) => T), options?: UpdateOptions): RObject<ReplaceResult<T>>;

    /**
     * Update JSON documents in a table. Accepts a JSON document, a ReQL expression, or a combination of the two. You can pass options like `returnChanges` that will return the old and new values of the row you have modified.
     *
     * https://rethinkdb.com/api/javascript/update
     */
    update (objectOrFunction: T | ((item: RObject<T>) => T), options?: UpdateOptions): RObject<UpdateResult<T>>;
  }

  export interface RandomOptions {
    float?: boolean;
  }

  export interface HttpOptions {
    /**
     * Timeout period in seconds to wait before aborting the connect (default `30`).
     */
    timeout?: number;
    /**
     * Number of retry attempts to make after failed connections (default `5`).
     */
    reattempts?: number;
    /**
     * Number of redirect and location headers to follow (default `1`).
     */
    redirects?: number;
    /**
     * If true, verify the server’s SSL certificate (default `true`).
     */
    verify?: boolean;
    /**
     * String specifying the format to return results in.
     */
    resultFormat?: 'text' | 'json' | 'jsonp' | 'binary' | 'auto';
    /**
     * HTTP method to use for the request. One of `GET`, `POST`, `PUT`, `PATCH`, `DELETE` or `HEAD`. Default: `GET`.
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
    /**
     * Object giving authentication
     */
    auth?: {
      type?: 'basic' | 'digest';
      user: string;
      pass: string;
    }
    /**
     * Object specifying URL parameters to append to the URL as encoded key/value pairs. `{ query: 'banana', limit: 2 }` will be appended as `?query=banana&limit=2`. Default: no parameters.
     */
    params: any;
    /**
     * Extra header lines to include. The value may be an array of strings or an object. Default: `Accept-Encoding: deflate;q=1, gzip;q=0.5` and `User-Agent: RethinkDB/<VERSION>`.
     */
    header: any;
    /**
     * Data to send to the server on a `POST`, `PUT`, `PATCH`, or `DELETE` request. For `POST` requests, data may be either an object (which will be written to the body as form-encoded key/value pairs) or a string; for all other requests, data will be serialized as JSON and placed in the request body, sent as `Content-Type: application/json`. Default: no data will be sent.
     */
    data: any;
  }

  export interface Row extends RDatum<any> {
    (name: r.StringLike<string>): RDatum<any>;
    <T extends RNumber<number>> (name: r.StringLike<string>): RNumber<number>;
    <T extends RString<string>> (name: r.StringLike<string>): RString<string>;
    <T extends RArray<any>> (name: r.StringLike<string>): T;
    <T extends RBoolean<boolean>> (name: r.StringLike<string>): RBoolean<boolean>;
    <T extends RTime> (name: r.StringLike<string>): RTime;
    <T extends RLine> (name: r.StringLike<string>): RLine;
    <T extends RPoint> (name: r.StringLike<string>): RPoint;
    <T extends RGeometry<any>> (name: r.StringLike<string>): T;
    <T extends RObject<any>> (name: r.StringLike<string>): T;
    <T extends number> (name: r.StringLike<string>): RNumber<number>;
    <T extends string> (name: r.StringLike<string>): RString<string>;
    <T extends boolean> (name: r.StringLike<string>): RBoolean<boolean>;
    <T extends Date> (name: r.StringLike<string>): RTime;
    <T extends Object> (name: r.StringLike<string>): RObject<T>;
    <T extends Array<ArrOfT>, ArrOfT> (name: r.StringLike<string>): RArray<ArrOfT>;
  }

  /**
   * `r.args` is a special term that's used to splice an array of arguments into another term. This is useful when you want to call a variadic term such as `getAll` with a set of arguments produced at runtime.
   *
   * This is analogous to using **apply** in JavaScript.
   *
   * https://rethinkdb.com/api/javascript/args
   */
  export function args <T> (array: r.ArrayLike<T>): RSpecial<T[]>;

  /**
   * Merge two or more sequences.
   *
   * https://rethinkdb.com/api/javascript/union
   */
  export function union <T, Other> (stream: RStream<T>, sequence: r.SequenceLike<Other>, ...sequencesOrOptions: (r.SequenceLike<Other> | UnionOptions<T>)[]): RStream<T | Other>;
  export function union <T, Other> (stream: RStream<T>, sequence: r.SequenceLike<Other>, options?: UnionOptions<T>): RStream<T | Other>;
  export function union <T, Other> (stream: RArray<T>, sequence: r.SequenceLike<Other>, ...sequencesOrOptions: (r.SequenceLike<Other> | UnionOptions<T>)[]): RArray<T | Other>;
  export function union <T, Other> (stream: RArray<T>, sequence: r.SequenceLike<Other>, options?: UnionOptions<T>): RArray<T | Other>;

  /**
   * You may also use the special constants `r.minval` and `r.maxval` for boundaries, which represent “less than any index key” and “more than any index key” respectively. For instance, if you use `r.minval` as the lower key, then between will return all documents whose primary keys (or indexes) are less than the specified upper key.
   */
  export var maxval: RSpecial<any>;

  /**
   * You may also use the special constants `r.minval` and `r.maxval` for boundaries, which represent “less than any index key” and “more than any index key” respectively. For instance, if you use `r.minval` as the lower key, then between will return all documents whose primary keys (or indexes) are less than the specified upper key.
   */
  export var minval: RSpecial<any>;

  /**
   * Encapsulate binary data within a query.
   *
   * https://rethinkdb.com/api/javascript/binary
   */
  export function binary (data: any): RBinary;

  /**
   * Perform a branching conditional equivalent to `if-then-else`.
   *
   * The `branch` command takes 2n+1 arguments: pairs of conditional expressions and commands to be executed if the conditionals return any value but `false` or `null` (i.e., "truthy" values), with a final "else" command to be evaluated if all of the conditionals are `false` or `null`.
   *
   * https://rethinkdb.com/api/javascript/branch
   */
  export function branch <T extends RAny> (test: r.BooleanLike<boolean>, trueAction: T, test2: r.BooleanLike<boolean>, test2Action: T, falseAction: T): T;
  export function branch <T extends RAny> (test: r.BooleanLike<boolean>, trueAction: T, falseAction: T): T;
  export function branch <T extends RAny> (test: r.BooleanLike<boolean>, ...testsAndActions: (T | r.BooleanLike<boolean>)[]): T;
  export function branch <T extends number> (test: r.BooleanLike<boolean>, trueAction: r.NumberLike<T>, test2: r.BooleanLike<boolean>, test2Action: r.NumberLike<T>, falseAction: r.NumberLike<T>): RNumber<T>;
  export function branch <T extends number> (test: r.BooleanLike<boolean>, trueAction: r.NumberLike<T>, falseAction: r.NumberLike<T>): RNumber<T>;
  export function branch <T extends number> (test: r.BooleanLike<boolean>, ...testsAndActions: (r.NumberLike<T> | r.BooleanLike<boolean>)[]): RNumber<T>;
  export function branch <T extends string> (test: r.BooleanLike<boolean>, trueAction: r.StringLike<T>, test2: r.BooleanLike<boolean>, test2Action: r.StringLike<T>, falseAction: r.StringLike<T>): RString<T>;
  export function branch <T extends string> (test: r.BooleanLike<boolean>, trueAction: r.StringLike<T>, falseAction: r.StringLike<T>): RString<T>;
  export function branch <T extends string> (test: r.BooleanLike<boolean>, ...testsAndActions: (r.StringLike<T> | r.BooleanLike<boolean>)[]): RString<T>;
  export function branch <T extends boolean> (test: r.BooleanLike<boolean>, trueAction: r.BooleanLike<T>, test2: r.BooleanLike<boolean>, test2Action: r.BooleanLike<T>, falseAction: r.BooleanLike<T>): RBoolean<T>;
  export function branch <T extends boolean> (test: r.BooleanLike<boolean>, trueAction: r.BooleanLike<T>, falseAction: r.BooleanLike<T>): RBoolean<T>;
  export function branch <T extends boolean> (test: r.BooleanLike<boolean>, ...testsAndActions: (r.BooleanLike<T> | r.BooleanLike<boolean>)[]): RBoolean<T>;
  export function branch <T> (test: r.BooleanLike<boolean>, trueAction: r.ArrayLike<T>, test2: r.BooleanLike<boolean>, test2Action: r.ArrayLike<T>, falseAction: r.ArrayLike<T>): RArray<T>;
  export function branch <T> (test: r.BooleanLike<boolean>, trueAction: r.ArrayLike<T>, falseAction: r.ArrayLike<T>): RArray<T>;
  export function branch <T> (test: r.BooleanLike<boolean>, ...testsAndActions: (r.ArrayLike<T> | r.BooleanLike<boolean>)[]): RArray<T>;
  export function branch <T> (test: r.BooleanLike<boolean>, trueAction: T, test2: r.BooleanLike<boolean>, test2Action: T, falseAction: T): RObject<T>;
  export function branch <T> (test: r.BooleanLike<boolean>, trueAction: T, falseAction: T): RObject<T>;
  export function branch <T> (test: r.BooleanLike<boolean>, ...testsAndActions: (T | r.BooleanLike<boolean>)[]): RObject<T>;

  /**
   * Rounds the given value up, returning the smallest integer value greater than or equal to the given value (the value's ceiling).
   *
   * https://rethinkdb.com/api/javascript/ceil
   */
  export function ceil (number: r.NumberLike<number>): RNumber<number>;

  /**
   * Construct a circular line or polygon. A circle in RethinkDB is a polygon or line _approximating_ a circle of a given radius around a given center, consisting of a specified number of vertices (default 32).
   *
   * https://rethinkdb.com/api/javascript/circle
   */
  export function circle (longitudeAndlatitude: [r.NumberLike<number>, r.NumberLike<number>] | RArray<number>, radius: r.NumberLike<number>, options?: CircleOptions): RGeometry<any>;
  export function circle (point: RPoint, radius: r.NumberLike<number>, options?: CircleOptions): RGeometry<any>;

  /**
   * Create a new connection to the database server.
   */
  export function connect (cb: (err: Error | void, conn: Connection) => void): void;
  export function connect (host: string, cb: (err: Error | void, conn: Connection) => void): void;
  export function connect (options: ConnectOptions, cb: (err: Error | void, conn: Connection) => void): void;
  export function connect (host?: string): Bluebird<Connection>;
  export function connect (options?: ConnectOptions): Bluebird<Connection>;

  /**
   * Reference a database.
   *
   * https://rethinkdb.com/api/javascript/db
   */
  export function db (dbName: r.StringLike<string>): RDb;

  /**
   * Create a database. A RethinkDB database is a collection of tables, similar to relational databases.
   *
   * https://rethinkdb.com/api/javascript/db_create
   */
  export function dbCreate (dbName: r.StringLike<string>): RObject<DbCreateResult>;

  /**
   * Drop a database. The database, all its tables, and corresponding data will be deleted.
   *
   * https://rethinkdb.com/api/javascript/db_drop
   */
  export function dbDrop (dbName: r.StringLike<string>): RObject<DbDropResult>;

  /**
   * List all database names in the system. The result is a list of strings.
   *
   * https://rethinkdb.com/api/javascript/db_list
   */
  export function dbList (): RArray<string>;

  /**
   * To specify the ordering, wrap the attribute with either r.asc or r.desc (defaults to ascending).
   */
  export function desc <T> (func: T | RValue<T>): RSpecial<T>;

  /**
   * To specify the ordering, wrap the attribute with either r.asc or r.desc (defaults to ascending).
   */
  export function asc <T> (func: T | RValue<T>): RSpecial<T>;

  /**
   * Create a time object based on seconds since epoch. The first argument is a double and will be rounded to three decimal places (millisecond-precision).
   *
   * https://rethinkdb.com/api/javascript/epoch_time
   */
  export function epochTime (epochTime: r.NumberLike<number>): RTime;

  /**
   * Throw a runtime error. If called with no arguments inside the second argument to `default`, re-throw the current error.
   *
   * https://rethinkdb.com/api/javascript/error
   */
  export function error (message: r.StringLike<string>): RError;

  /**
   * Construct a ReQL JSON object from a native object.
   *
   * https://rethinkdb.com/api/javascript/expr
   */
  export function expr <T> (value: T): RDatum<T>;

  /**
   * Rounds the given value down, returning the largest integer value less than or equal to the given value (the value's floor).
   *
   * https://rethinkdb.com/api/javascript/floor
   */
  export function floor (number: r.NumberLike<number>): RNumber<number>;

  /**
   * Convert a [GeoJSON](http://geojson.org) object to a ReQL geometry object.
   *
   * https://rethinkdb.com/api/javascript/geojson
   */
  export function geojson (geojson: Object | RObject<any>): RGeometry<Object>;

  /**
   * Compute the distance between a point and another geometry object. At least one of the geometry objects specified must be a point.
   *
   * https://rethinkdb.com/api/javascript/distance
   */
  export function distance (geometry1: RGeometry<any>, geometry2: RGeometry<any>, options?: DistanceOptions): RNumber<number>;

  /**
   * Retrieve data from the specified URL over HTTP. The return type depends on the `resultFormat` option, which checks the `Content-Type` of the response by default.
   *
   * https://rethinkdb.com/api/javascript/http
   */
  export function http <T> (url: r.StringLike<string>, options?: HttpOptions): RDatum<T>;

  /**
   * Create a time object based on an ISO 8601 date-time string (e.g. '2013-01-01T01:01:01+00:00'). We support all valid ISO 8601 formats except for week dates. If you pass an ISO 8601 date-time without a time zone, you must specify the time zone with the `defaultTimezone` argument. Read more about the ISO 8601 format at [Wikipedia](http://en.wikipedia.org/wiki/ISO_8601).
   *
   * https://rethinkdb.com/api/javascript/iso8601
   */
  export function ISO8601 (iso8601Date: r.StringLike<string>, options?: { defaultTimezone?: r.StringLike<string> }): RTime;

  /**
   * Create a javascript expression.
   *
   * https://rethinkdb.com/api/javascript/js
   */
  export function js <T> (jsString: r.StringLike<string>, options?: { timeout?: number }): RDatum<T>;

  /**
   * Parse a JSON string on the server.
   *
   * https://rethinkdb.com/api/javascript/json
   */
  export function json <T> (jsonString: r.StringLike<string>): RDatum<T>;

  /**
   * Construct a geometry object of type Line.
   *
   * https://rethinkdb.com/api/javascript/line
   */
  export function line (...lonAndLat: Array<[r.NumberLike<number>, r.NumberLike<number>]>): RLine;
  export function line (...points: RPoint[]): RLine;

  /**
   * Replace an object in a field instead of merging it with an existing object in a `merge` or `update` operation.
   *
   * https://rethinkdb.com/api/javascript/literal
   */
  export function literal <T> (object: T): RSpecial<T>;

  /**
   * Return a time object representing the current time in UTC. The command now() is computed once when the server receives the query, so multiple instances of r.now() will always return the same time inside a query.
   *
   * https://rethinkdb.com/api/javascript/now
   */
  export function now (): RTime;

  /**
   * Creates an object from a list of key-value pairs, where the keys must be strings. `r.object(A, B, C, D)` is equivalent to `r.expr([[A, B], [C, D]]).coerce_to('OBJECT')`.
   *
   * https://rethinkdb.com/api/javascript/object
   */
  export function object <T> (...keyAndValues: any[]): RObject<T>;

  /**
   * Construct a geometry object of type Point. The point is specified by two floating point numbers, the longitude (−180 to 180) and the latitude (−90 to 90) of the point on a perfect sphere.
   *
   * https://rethinkdb.com/api/javascript/point
   */
  export function point (longitude: r.NumberLike<number>, latitude: r.NumberLike<number>): RPoint;

  /**
   * Construct a geometry object of type Polygon.
   *
   * https://rethinkdb.com/api/javascript/polygon
   */
  export function polygon (lon1Andlat1: [r.NumberLike<number>, r.NumberLike<number>], ...more: Array<[r.NumberLike<number>, r.NumberLike<number>]>): RPolygon;
  export function polygon (point1: RPoint, ...points: Array<RPoint>): RPolygon;

  /**
   * Generate a random number between given (or implied) bounds. `random` takes zero, one or two arguments.
   *
   * https://rethinkdb.com/api/javascript/random
   */
  export function random (min: r.NumberLike<number>, max: r.NumberLike<number>, options?: RandomOptions): RNumber<number>;
  export function random (number: r.NumberLike<number>, options?: RandomOptions): RNumber<number>;
  export function random (): RNumber<number>;

  /**
   * Generate a stream of sequential integers in a specified range.
   *
   * https://rethinkdb.com/api/javascript/range
   */
  export function range (startValue: r.NumberLike<number>, endValue: r.NumberLike<number>): RStream<number>;
  export function range (endValue: r.NumberLike<number>): RStream<number>;
  export function range (): RStream<number>;

  /**
   * Rounds the given value to the nearest whole integer.
   *
   * https://rethinkdb.com/api/javascript/round
   */
  export function round (number: r.NumberLike<number>): RNumber<number>;

  /**
   * Returns the currently visited document.
   *
   * https://rethinkdb.com/api/javascript/row
   */
  export var row: Row;

  /**
   * Create a time object for a specific time.
   *
   * A few restrictions exist on the arguments:
   *
   * - `year` is an integer between 1400 and 9,999.
   * - `month` is an integer between 1 and 12.
   * - `day` is an integer between 1 and 31.
   * - `hour` is an integer.
   * - `minutes` is an integer.
   * - `seconds` is a double. Its value will be rounded to three decimal places (millisecond-precision).
   * - `timezone` can be `'Z'` (for UTC) or a string with the format `±[hh]:[mm]`.
   *
   * https://rethinkdb.com/api/javascript/time
   */
  export function time (year: r.NumberLike<number>, month: r.NumberLike<number>, day: r.NumberLike<number>, hour: r.NumberLike<number>, minute: r.NumberLike<number>, second: r.NumberLike<number>, timezone?: r.StringLike<string>): RTime;
  export function time (year: r.NumberLike<number>, month: r.NumberLike<number>, day: r.NumberLike<number>, timezone?: r.StringLike<string>): RTime;

  /**
   * Return a UUID (universally unique identifier), a string that can be used as a unique ID.
   *
   * https://rethinkdb.com/api/javascript/uuid
   */
  export function uuid (deterministicStringToHash?: r.StringLike<string>): RString<string>;

  /**
   * Wait for a table or all the tables in a database to be ready. A table may be temporarily unavailable after creation, rebalancing or reconfiguring. The `wait` command blocks until the given table (or database) is fully up to date.
   *
   * https://rethinkdb.com/api/javascript/wait
   */
  export function wait (table: RTable<any>, options?: WaitOptions): RObject<WaitResult>;
  export function wait (database: RDb, options?: WaitOptions): RObject<WaitResult>;

  /**
   * Compute the logical "and" of one or more values.
   *
   * https://rethinkdb.com/api/javascript/and
   */
  export function and (...bools: Array<r.BooleanLike<boolean>>): RBoolean<boolean>;

  /**
   * Compute the logical inverse (not) of an expression.
   *
   * https://rethinkdb.com/api/javascript/not
   */
  export function not (bool: r.BooleanLike<boolean>): RBoolean<boolean>;

  /**
   * Compute the logical "or" of one or more values.
   *
   * https://rethinkdb.com/api/javascript/or
   */
  export function or (...bools: Array<r.BooleanLike<boolean>>): RBoolean<boolean>;

  /**
   * Select all documents in a table. This command can be chained with other commands to do further processing on the data.
   *
   * https://rethinkdb.com/api/javascript/table
   */
  export function table <T> (name: r.StringLike<string>, options?: TableOptions): RTable<T>;

  /**
   * Create a table. A RethinkDB table is a collection of JSON documents.
   *
   * https://rethinkdb.com/api/javascript/table_create
   */
  export function tableCreate (tableName: r.StringLike<string>, options?: TableCreateOptions): RObject<TableCreateResult>;

  /**
   * Drop a table. The table and all its data will be deleted.
   *
   * https://rethinkdb.com/api/javascript/table_drop
   */
  export function tableDrop (tableName: r.StringLike<string>): RObject<TableDropResult>;

  /**
   * List all table names in a database. The result is a list of strings.
   *
   * https://rethinkdb.com/api/javascript/table_list
   */
  export function tableList (): RArray<string>;

  export interface Cursor <T> extends EventEmitter {
    /**
     * Close a cursor. Closing a cursor cancels the corresponding query and frees the memory associated with the open request.
     *
     * https://rethinkdb.com/api/javascript/close-cursor
     */
    close (): void;

    /**
     * Lazily iterate over the result set one element at a time.
     *
     * https://rethinkdb.com/api/javascript/each
     */
    each (callback: Callback<T>, onFinishedCallback?: Callback<T>): void;

    /**
     * Lazily iterate over a cursor, array, or feed one element at a time. `eachAsync` always returns a promise that will be resolved once all rows are returned.
     *
     * https://rethinkdb.com/api/javascript/each_async
     */
    eachAsync (processFunction: (element: T, rowFinished?: (err: any) => void) => any, finalFunction?: (err?: Error) => any): Bluebird<void>;

    /**
     * Get the next element in the cursor.
     *
     * https://rethinkdb.com/api/javascript/next
     */
    next (callback: Callback<T>): void;
    next (): Bluebird<T>;

    /**
     * Retrieve all results and pass them as an array to the given callback.
     *
     * https://rethinkdb.com/api/javascript/to_array
     */
    toArray (callback: Callback<Array<T>>): void;
    toArray (): Bluebird<Array<T>>;
  }

  export interface Connection extends EventEmitter {
    clientPort (): number;
    clientAddress (): string;

    /**
     * Close an open connection. If no callback is provided, a promise will be returned.
     *
     * https://rethinkdb.com/api/javascript/close
     */
    close (cb: Callback<void>): void;
    close (options: CloseOptions, cb: Callback<void>): void;
    close (options?: CloseOptions): Bluebird<void>;

    /**
     * Close and reopen a connection.
     *
     * https://rethinkdb.com/api/javascript/reconnect
     */
    reconnect (cb: Callback<Connection>): void;
    reconnect (options: CloseOptions, cb: Callback<Connection>): void;
    reconnect (options?: CloseOptions): Bluebird<Connection>;

    /**
     * `noreplyWait` ensures that previous queries with the `noreply` flag have been processed by the server. Note that this guarantee only applies to queries run on the given connection.
     *
     * https://rethinkdb.com/api/javascript/noreply_wait
     */
    noreplyWait (callback: Callback<void>): void;
    noreplyWait (): Bluebird<void>;

    /**
     * Change the default database on this connection.
     *
     * https://rethinkdb.com/api/javascript/use
     */
    use (dbName: string): void;

    /**
     * Return the server name and server UUID being used by a connection.
     */
    server (callback: Callback<ServerInfo>): void;
    server (): Bluebird<ServerInfo>;
  }

  export interface WaitOptions {
    /**
     * A string indicating a table status to wait on before returning, one of `ready_for_outdated_reads`, `ready_for_reads`, `ready_for_writes`, or `all_replicas_ready`. The default is `all_replicas_ready`.
     */
    waitFor?: 'ready_for_outdated_reads' | 'ready_for_reads' | 'ready_for_writes' | 'all_replicas_ready';
    /**
     * A number indicating maximum time, in seconds, to wait for the table to be ready. If this value is exceeded, a `ReqlRuntimeError` will be thrown. A value of `0` means no timeout. The default is `0` (no timeout).
     */
    timeout?: number;
  }

  export interface WaitResult {
    ready: number;
  }

  export interface ReconfigureOptions {
    /**
     * The number of shards, an integer from 1-64. Required.
     */
    shards: number;
    /**
     * Either an integer or a mapping object. Required.
     *
     * - If `replicas` is an integer, it specifies the number of replicas per shard. Specifying more replicas than there are servers will return an error.
     * - If `replicas` is an object, it specifies key-value pairs of server tags and the number of replicas to assign to those servers: `{tag1: 2, tag2: 4, tag3: 2, ...}`.
     */
    replicas: number | { [tag: string]: number };
    /**
     * The primary server specified by its server tag. Required if `replicas` is an object; the tag must be in the object. This must not be specified if `replicas` is an integer.
     */
    primaryReplicaTag?: string;
    /**
     * If `true` the generated configuration will not be applied to the table, only returned.
     */
    dryRun?: boolean;
    /**
     * Replicas with these server tags will be added to the nonvoting_replicas list of the resulting configuration. (See failover for details about non-voting replicas.)
     */
    nonvotingReplicaTags?: string[];
    /**
     * Used for the Emergency Repair mode.
     */
    emergencyRepair?: 'unsafe_rollback' | 'unsafe_rollback_or_erase';
  }

  export interface ReconfigureResult {
    /**
     * The number of tables reconfigured. This will be `0` if `dryRun` is `true`.
     */
    reconfigured: number;
    /**
     * A list of new and old table configuration values.
     */
    config_changes: ChangeSet<Config, Config>;
    /**
     * A list of new and old table status values.
     */
    status_changes: ChangeSet<StatusResult, StatusResult>;
  }

  export interface RebalanceResult {
    rebalanced: number;
    status_changes: ChangeSet<StatusResult, StatusResult>;
  }

  export interface RConfigurable extends RAny {
    /**
     * Query (read and/or update) the configurations for individual tables or databases.
     *
     * https://rethinkdb.com/api/javascript/config
     */
    config (): RSingleSelection<Config>;

    /**
     * Rebalances the shards of a table. When called on a database, all the tables in that database will be rebalanced.
     *
     * https://rethinkdb.com/api/javascript/rebalance
     */
    rebalance (): RObject<RebalanceResult>;

    /**
     * Reconfigure a table's sharding and replication.
     *
     * https://rethinkdb.com/api/javascript/reconfigure
     */
    reconfigure (options: ReconfigureOptions): RObject<ReconfigureResult>;

    /**
     * Wait for a table or all the tables in a database to be ready. A table may be temporarily unavailable after creation, rebalancing or reconfiguring. The `wait` command blocks until the given table (or database) is fully up to date.
     *
     * https://rethinkdb.com/api/javascript/wait
     */
    wait (options?: WaitOptions): RObject<WaitResult>;
  }

  export interface RDb extends RConfigurable, RAny {
    /**
     * Select all documents in a table. This command can be chained with other commands to do further processing on the data.
     *
     * https://rethinkdb.com/api/javascript/table
     */
    table <T> (name: r.StringLike<string>, options?: TableOptions): RTable<T>;

    /**
     * Create a table. A RethinkDB table is a collection of JSON documents.
     *
     * https://rethinkdb.com/api/javascript/table_create
     */
    tableCreate (tableName: r.StringLike<string>, options?: TableCreateOptions): RObject<TableCreateResult>;

    /**
     * Drop a table. The table and all its data will be deleted.
     *
     * https://rethinkdb.com/api/javascript/table_drop
     */
    tableDrop (tableName: r.StringLike<string>): RObject<TableDropResult>;

    /**
     * List all table names in a database. The result is a list of strings.
     *
     * https://rethinkdb.com/api/javascript/table_list
     */
    tableList (): RArray<string>;
  }

  interface RCoercable {
    /**
     * Convert a value of one type into another.
     *
     * https://rethinkdb.com/api/javascript/coerce_to
     */
    coerceTo <T extends string> (type: 'string'): RString<T>;
    coerceTo <T extends number> (type: 'number'): RNumber<T>;
    coerceTo <T> (type: 'array'): RArray<T>;
    coerceTo <T> (type: 'object'): RObject<T>;
    coerceTo (type: 'binary'): RBinary;
    coerceTo (type: string): RAny;
  }

  interface JoinFunction <U> {
    (left: RObject<any>, right: RObject<any>): U;
  }

  interface GroupResult <Group, Reduction> {
    group: Group;
    reduction: Array<Reduction>;
  }

  interface JoinResult <Left, Right> {
    left: Left;
    right: Right;
  }

  export interface RunOptions {
    /**
     * One of three possible values affecting the consistency guarantee for the query (default: `'single'`).
     *
     * - `'single'` (the default) returns values that are in memory (but not necessarily written to disk) on the primary replica.
     * - `'majority'` will only return values that are safely committed on disk on a majority of replicas. This requires sending a message to every replica on each read, so it is the slowest but most consistent.
     * - `'outdated'` will return values that are in memory on an arbitrarily-selected replica. This is the fastest but least consistent.
     */
    readMode?: 'single' | 'majority' | 'outdated';
    /**
     * What format to return times in (default: `'native'`). Set this to `'raw'` if you want times returned as JSON objects for exporting.
     */
    timeFormat?: 'native' | 'raw';
    /**
     * Whether or not to return a profile of the query’s execution (default: `false`).
     */
    profile?: boolean;
    /**
     * Possible values are `'hard'` and `'soft'`. In soft durability mode RethinkDB will acknowledge the write immediately after receiving it, but before the write has been committed to disk.
     */
    durability?: 'hard' | 'soft';
    /**
     * What format to return `grouped_data` and `grouped_streams` in (default: `'native'`). Set this to `'raw'` if you want the raw pseudotype.
     */
    groupFormat?: 'native' | 'raw';
    /**
     * Set to `true` to not receive the result object or cursor and return immediately.
     */
    noreply?: boolean;
    /**
     * The database to run this query against as a string. The default is the database specified in the `db` parameter to connect (which defaults to `test`). The database may also be specified with the db command.
     */
    db?: string;
    /**
     * The maximum numbers of array elements that can be returned by a query (default: 100,000). This affects all ReQL commands that return arrays. Note that it has no effect on the size of arrays being written to the database; those always have an upper limit of 100,000 elements.
     */
    arrayLimit?: number;
    /**
     * What format to return binary data in (default: `'native'`). Set this to `'raw'` if you want the raw pseudotype.
     */
    binaryFormat?: 'native' | 'raw';
    /**
     * Minimum number of rows to wait for before batching a result set (default: 8). This is an integer.
     */
    minBatchRows?: number;
    /**
     * Maximum number of rows to wait for before batching a result set (default: unlimited). This is an integer.
     */
    maxBatchRows?: number;
    /**
     * Maximum number of bytes to wait for before batching a result set (default: 1MB). This is an integer.
     */
    maxBatchBytes?: number;
    /**
     * Maximum number of seconds to wait before batching a result set (default: 0.5). This is a float (not an integer) and may be specified to the microsecond.
     */
    maxBatchSeconds?: number;
    /**
     * Factor to scale the other parameters down by on the first batch (default: 4). For example, with this set to 8 and `maxBatchRows` set to 80, on the first batch `maxBatchRows` will be adjusted to 10 (80 / 8). This allows the first batch to return faster.
     */
    firstBatchScaledownFactor?: number;
  }

  export interface RRunable<T> {
    run (connection: Connection, cb: Callback<T>): void;
    run (connection: Connection, options: RunOptions, cb: Callback<T>): void;
    run (connection: Connection, options?: RunOptions): Bluebird<T>;
  }
}

export = rethinkdb;