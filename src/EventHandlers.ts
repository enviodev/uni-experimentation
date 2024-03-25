/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  UniswapV3FactoryContract,
  UniswapV3PoolContract,
} from "../generated/src/Handlers.gen";

import {
  UniswapV3Factory_PoolCreatedEntity,
  UniswapV3Pool_MintEntity,
  UniswapV3Pool_BurnEntity,
  uniswapV3Pool_InitializeEntity,
  // uniswapV3Pool_SwapEntity,
  TickEntity,
} from "../generated/src/Types.gen";

const INITIAL_TICK_ENTITY: TickEntity = {
  id: "INITIAL_TICK",
  poolAddress: "EMPTY",
  tickIdx: BigInt(0),
  liquidityNet: BigInt(0),
};

UniswapV3FactoryContract.PoolCreated.loader(({ event, context }) => {
  context.contractRegistration.addUniswapV3Pool(event.params.pool);
});

UniswapV3FactoryContract.PoolCreated.handler(({ event, context }) => {
  const uniswapV3Factory_PoolCreatedEntity: UniswapV3Factory_PoolCreatedEntity =
    {
      id: event.transactionHash + event.logIndex.toString(),
      token0: event.params.token0,
      token1: event.params.token1,
      fee: event.params.fee,
      tickSpacing: event.params.tickSpacing,
      pool: event.params.pool,
    };

  context.UniswapV3Factory_PoolCreated.set(uniswapV3Factory_PoolCreatedEntity);
});

UniswapV3PoolContract.Burn.loader(({ event, context }) => {
  let poolAddress = event.srcAddress.toString();
  let lowerTickId = poolAddress + "#" + event.params.tickLower.toString();
  let upperTickId = poolAddress + "#" + event.params.tickUpper.toString();

  context.Tick.load(lowerTickId);
  context.Tick.load(upperTickId);
});

UniswapV3PoolContract.Burn.handler(({ event, context }) => {
  let lowerTickIdx = event.params.tickLower;
  let upperTickIdx = event.params.tickUpper;
  let amount = event.params.amount;
  let poolAddress = event.srcAddress.toString();

  let lowerTickId = poolAddress + "#" + event.params.tickLower.toString();
  let upperTickId = poolAddress + "#" + event.params.tickUpper.toString();

  let lowerTick = context.Tick.get(lowerTickId);
  let upperTick = context.Tick.get(upperTickId);

  const lowerTickEntity: TickEntity = lowerTick ?? INITIAL_TICK_ENTITY;
  const upperTickEntity: TickEntity = upperTick ?? INITIAL_TICK_ENTITY;

  const nextLowerTickEntity = {
    ...lowerTickEntity,
    id: lowerTickId,
    poolAddress: poolAddress,
    tickIdx: lowerTickIdx,
    liquidityNet: lowerTickEntity.liquidityNet - amount,
  };

  const nextUpperTickEntity = {
    ...upperTickEntity,
    id: upperTickId,
    poolAddress: poolAddress,
    tickIdx: upperTickIdx,
    liquidityNet: upperTickEntity.liquidityNet + amount,
  };

  const uniswapV3Pool_BurnEntity: UniswapV3Pool_BurnEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    owner: event.params.owner,
    tickLower: event.params.tickLower,
    tickUpper: event.params.tickUpper,
    amount: event.params.amount,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
  };

  context.Tick.set(nextLowerTickEntity);
  context.Tick.set(nextUpperTickEntity);
  context.UniswapV3Pool_Burn.set(uniswapV3Pool_BurnEntity);
});
UniswapV3PoolContract.Initialize.loader(({ event, context }) => {});

UniswapV3PoolContract.Initialize.handler(({ event, context }) => {
  const uniswapV3Pool_InitializeEntity: uniswapV3Pool_InitializeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sqrtPriceX96: event.params.sqrtPriceX96,
    tick: event.params.tick,
  };

  context.UniswapV3Pool_Initialize.set(uniswapV3Pool_InitializeEntity);
});

UniswapV3PoolContract.Mint.loader(({ event, context }) => {
  let poolAddress = event.srcAddress.toString();
  let lowerTickId = poolAddress + "#" + event.params.tickLower.toString();
  let upperTickId = poolAddress + "#" + event.params.tickUpper.toString();

  context.Tick.load(lowerTickId);
  context.Tick.load(upperTickId);
});

UniswapV3PoolContract.Mint.handler(({ event, context }) => {
  let lowerTickIdx = event.params.tickLower;
  let upperTickIdx = event.params.tickUpper;
  let amount = event.params.amount;
  let poolAddress = event.srcAddress.toString();

  let lowerTickId = poolAddress + "#" + event.params.tickLower.toString();
  let upperTickId = poolAddress + "#" + event.params.tickUpper.toString();

  let lowerTick = context.Tick.get(lowerTickId);
  let upperTick = context.Tick.get(upperTickId);

  const lowerTickEntity: TickEntity = lowerTick ?? INITIAL_TICK_ENTITY;
  const upperTickEntity: TickEntity = upperTick ?? INITIAL_TICK_ENTITY;

  const nextLowerTickEntity = {
    ...lowerTickEntity,
    id: lowerTickId,
    poolAddress: poolAddress,
    tickIdx: lowerTickIdx,
    liquidityNet: lowerTickEntity.liquidityNet + amount,
  };

  const nextUpperTickEntity = {
    ...upperTickEntity,
    id: upperTickId,
    poolAddress: poolAddress,
    tickIdx: upperTickIdx,
    liquidityNet: upperTickEntity.liquidityNet - amount,
  };

  const uniswapV3Pool_MintEntity: UniswapV3Pool_MintEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    owner: event.params.owner,
    tickLower: event.params.tickLower,
    tickUpper: event.params.tickUpper,
    amount: event.params.amount,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
  };

  context.Tick.set(nextLowerTickEntity);
  context.Tick.set(nextUpperTickEntity);

  context.UniswapV3Pool_Mint.set(uniswapV3Pool_MintEntity);
});

// UniswapV3PoolContract.Swap.loader(({ event, context }) => {});

// UniswapV3PoolContract.Swap.handler(({ event, context }) => {
//   const uniswapV3Pool_SwapEntity: uniswapV3Pool_SwapEntity = {
//     id: event.transactionHash + event.logIndex.toString(),
//     sender: event.params.sender,
//     recipient: event.params.recipient,
//     amount0: event.params.amount0,
//     amount1: event.params.amount1,
//     sqrtPriceX96: event.params.sqrtPriceX96,
//     liquidity: event.params.liquidity,
//     tick: event.params.tick,
//     eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
//   };

//   context.UniswapV3Pool_Swap.set(uniswapV3Pool_SwapEntity);
// });
