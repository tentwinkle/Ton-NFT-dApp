import { beginCell, toNano } from 'ton-core';
import { CustomersCollection } from '../wrappers/CustomersCollection';
import { compile, NetworkProvider } from '@ton-community/blueprint';
import { randomAddress } from './helpers/randomAddr';
import { NftItemCodeCell } from './helpers/nftItemCode';
import { randomSeed } from './helpers/randomSeed';

export async function run(provider: NetworkProvider) {
    const customersCollection = CustomersCollection.createFromConfig(
        {
            ownerAddress: randomAddress(),
            nextItemIndex: 0,
            content: beginCell().storeUint(randomSeed, 256).endCell(),
            nftItemCode: NftItemCodeCell,
            royaltyParams: beginCell()
                            .storeUint(12, 16)
                            .storeUint(100, 16) // 1,2 %
                            .storeAddress(randomAddress())
                            .endCell()
        },
        await compile('CustomersCollection')
    );

    await provider.deploy(customersCollection, toNano('0.05'));

    const openedContract = provider.open(customersCollection);

    // run methods on `openedContract`
}
