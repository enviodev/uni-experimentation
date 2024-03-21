// import assert = require("assert")
// import { MockDb, UniswapV3Factory } from "../generated/src/TestHelpers.gen";
// import {
//   EventsSummaryEntity,
//   UniswapV3Factory_PoolCreatedEntity,
// } from "../generated/src/Types.gen";

// import { Addresses } from "../generated/src/bindings/Ethers.bs";

// import { GLOBAL_EVENTS_SUMMARY_KEY } from "../src/EventHandlers";

// const MOCK_EVENTS_SUMMARY_ENTITY: EventsSummaryEntity = {
//   id: GLOBAL_EVENTS_SUMMARY_KEY,
//   uniswapV3Factory_PoolCreatedCount: BigInt(0),
//   uniswapV3Pool_BurnCount: BigInt(0),
//   uniswapV3Pool_InitializeCount: BigInt(0),
//   uniswapV3Pool_MintCount: BigInt(0),
// };

// describe("UniswapV3Factory contract PoolCreated event tests", () => {
//   // Create mock db
//   const mockDbInitial = MockDb.createMockDb();

//   // Add mock EventsSummaryEntity to mock db
//   const mockDbFinal = mockDbInitial.entities.EventsSummary.set(
//     MOCK_EVENTS_SUMMARY_ENTITY
//   );

//   // Creating mock UniswapV3Factory contract PoolCreated event
//   const mockUniswapV3FactoryPoolCreatedEvent = UniswapV3Factory.PoolCreated.createMockEvent({
//     token0: Addresses.defaultAddress,
//     token1: Addresses.defaultAddress,
//     fee: 0n,
//     tickSpacing: 0n,
//     pool: Addresses.defaultAddress,
//     mockEventData: {
//       chainId: 1,
//       blockNumber: 0,
//       blockTimestamp: 0,
//       blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
//       srcAddress: Addresses.defaultAddress,
//       transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
//       transactionIndex: 0,
//       logIndex: 0,
//     },
//   });

//   // Processing the event
//   const mockDbUpdated = UniswapV3Factory.PoolCreated.processEvent({
//     event: mockUniswapV3FactoryPoolCreatedEvent,
//     mockDb: mockDbFinal,
//   });

//   it("UniswapV3Factory_PoolCreatedEntity is created correctly", () => {
//     // Getting the actual entity from the mock database
//     let actualUniswapV3FactoryPoolCreatedEntity = mockDbUpdated.entities.UniswapV3Factory_PoolCreated.get(
//       mockUniswapV3FactoryPoolCreatedEvent.transactionHash +
//         mockUniswapV3FactoryPoolCreatedEvent.logIndex.toString()
//     );

//     // Creating the expected entity
//     const expectedUniswapV3FactoryPoolCreatedEntity: UniswapV3Factory_PoolCreatedEntity = {
//       id:
//         mockUniswapV3FactoryPoolCreatedEvent.transactionHash +
//         mockUniswapV3FactoryPoolCreatedEvent.logIndex.toString(),
//       token0: mockUniswapV3FactoryPoolCreatedEvent.params.token0,
//       token1: mockUniswapV3FactoryPoolCreatedEvent.params.token1,
//       fee: mockUniswapV3FactoryPoolCreatedEvent.params.fee,
//       tickSpacing: mockUniswapV3FactoryPoolCreatedEvent.params.tickSpacing,
//       pool: mockUniswapV3FactoryPoolCreatedEvent.params.pool,
//       eventsSummary: "GlobalEventsSummary",
//     };
//     // Asserting that the entity in the mock database is the same as the expected entity
//     assert.deepEqual(actualUniswapV3FactoryPoolCreatedEntity, expectedUniswapV3FactoryPoolCreatedEntity, "Actual UniswapV3FactoryPoolCreatedEntity should be the same as the expectedUniswapV3FactoryPoolCreatedEntity");
//   });

//   it("EventsSummaryEntity is updated correctly", () => {
//     // Getting the actual entity from the mock database
//     let actualEventsSummaryEntity = mockDbUpdated.entities.EventsSummary.get(
//       GLOBAL_EVENTS_SUMMARY_KEY
//     );

//     // Creating the expected entity
//     const expectedEventsSummaryEntity: EventsSummaryEntity = {
//       ...MOCK_EVENTS_SUMMARY_ENTITY,
//       uniswapV3Factory_PoolCreatedCount: MOCK_EVENTS_SUMMARY_ENTITY.uniswapV3Factory_PoolCreatedCount + BigInt(1),
//     };
//     // Asserting that the entity in the mock database is the same as the expected entity
//     assert.deepEqual(actualEventsSummaryEntity, expectedEventsSummaryEntity, "Actual UniswapV3FactoryPoolCreatedEntity should be the same as the expectedUniswapV3FactoryPoolCreatedEntity");
//   });
// });
