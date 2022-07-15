
const mongoose = require('mongoose')

const func = (position, id, route = false) => {
    const filter = position === 'manager' ? 'managerId' : (position === 'agent' ? 'agentId' : 'courierId')

    const filterCash = (position === 'super-admin' || position === 'admin') ? [] : ([{
        '$match': {
            [filter]: mongoose.Types.ObjectId(id)
        }
    }]);

    const lookupUnwindOther = route ? [
        {
            $lookup: {
                from: 'customers',
                localField: 'order.customerId',
                foreignField: '_id',
                as: 'order.customerId'
            }
        }, {
            $unwind: '$order.customerId'
        }
    ] : [];

    // const cashOther = cash ? {
    //     cash: {
    //         $gt: 0
    //     }
    // } : {
    //     debt: {
    //         $gt: 0
    //     }
    // }

    // const countOther = cash ? {
    //     count: {
    //         $sum: '$cash'
    //     }
    // } : {
    //     count: {
    //         $sum: '$debt'
    //     }
    // }

    const groupOther = !route ? [
        {
            $group: {
                _id: 'static',
                count: {
                    $sum: '$debt'
                }
            }
        }
    ] : [];

    const projectOther = route ? {
        date: '$date',
        customers: {
            fullname: '$order.customerId.fullname',
            address: '$order.customerId.address',
            id: '$order.customerId._id'
        }
    } : {};

    // const price = cash ? { cash: '$cash' } : { debt: '$debt' }


    const pipeline = [{
        $match: {
            debt: { $gt: 0 }
        }
    }, {
        $lookup: {
            from: 'deliveries',
            localField: 'deliveryId',
            foreignField: '_id',
            as: 'deliveryId'
        }
    }, {
        $unwind: '$deliveryId'
    }, {
        $lookup: {
            from: 'orders',
            localField: 'deliveryId.orderId',
            foreignField: '_id',
            as: 'order'
        }
    }, {
        $unwind: '$order'
    }, {
        $lookup: {
            from: 'users',
            localField: 'order.agentId',
            foreignField: '_id',
            as: 'agent'
        }
    }, {
        $unwind: '$agent'
    },
    ...lookupUnwindOther, {
        $project: {
            courierId: '$deliveryId.courierId',
            managerId: '$agent.managerId',
            agentId: '$order.agentId',
            debt: '$debt',
            ...projectOther
        }
    },
    ...filterCash,
    ...groupOther
    ]

    return pipeline;
}

const funcDebt = (position, id, userId, route = false) => {

    const filter = position === 'manager' ? 'managerId' : (position === 'agent' ? 'agentId' : 'courierId')

    const filterCash = (position === 'super-admin' || position === 'admin') ? [] : ([{
        '$match': {
            'customerId': mongoose.Types.ObjectId(userId),
            [filter]: mongoose.Types.ObjectId(id)
        }
    }]);

    const groupDebt = route ? [
        {
            $group: {
                _id: 'static',
                cash: {
                    $sum: '$cash'
                },
                debt: {
                    $sum: '$debt'
                },
                card: {
                    $sum: '$card'
                }
            }
        }
    ] : []

    const projectDebt = route ? {
        cash: '$cash',
        debt: '$debt',
        card: '$card'
    } : {
        debt: '$debt',
        date: '$date'
    }

    const pipelineDebt = [{
        $lookup: {
            from: 'deliveries',
            localField: 'deliveryId',
            foreignField: '_id',
            as: 'deliveryId'
        }
    }, {
        $unwind: '$deliveryId'
    }, {
        $lookup: {
            from: 'orders',
            localField: 'deliveryId.orderId',
            foreignField: '_id',
            as: 'order'
        }
    }, {
        $unwind: '$order'
    }, {
        $lookup: {
            from: 'users',
            localField: 'order.agentId',
            foreignField: '_id',
            as: 'agent'
        }
    }, {
        $unwind: '$agent'
    }, {
        $project: {
            courierId: '$deliveryId.courierId',
            managerId: '$agent.managerId',
            agentId: '$order.agentId',
            customerId: '$order.customerId',
            ...projectDebt
        }
    },
    ...filterCash,
    ...groupDebt
    ]

    return pipelineDebt
}


const managerAsset = (id, asset = false) => {

    const matchStatus = asset ? {
        toStatus: 'process-Cour',
    } : {
        toStatus: 'inManager',
    }

    const processStatus = asset ? {
        'processId.status': 'inCour'
    } : {
        'processId.status': 'inManager'
    }

    const pipelineCash = [{
        $match: {
            isRefusal: false,
            ...matchStatus
        }
    }, {
        $lookup: {
            from: 'processes',
            localField: 'processId',
            foreignField: '_id',
            as: 'processId'
        }
    }, {
        $unwind: '$processId'
    }, {
        $match: {
            ...processStatus
        }
    }, {
        $unwind: '$processId.cheques'
    }, {
        $lookup: {
            from: 'users',
            localField: 'processId.courierId',
            foreignField: '_id',
            as: 'courierId'
        }
    }, {
        $unwind: '$courierId'
    }, {
        $lookup: {
            from: 'cheques',
            localField: 'processId.cheques',
            foreignField: '_id',
            as: 'processId.cheques'
        }
    }, {
        $unwind: '$processId.cheques'
    }, {
        $match: {
            'courierId.managerId': mongoose.Types.ObjectId(id)
        }
    }, {
        $group: {
            _id: '$_id',
            cash: {
                $sum: '$processId.cheques.cash'
            },
            count: {
                $sum: 1
            },
            fullname: {
                $addToSet: '$courierId.fullname'
            },
            date: {
                $addToSet: '$date'
            },
            processId: {
                $addToSet: '$processId._id'
            }
        }
    }, {
        $unwind: '$fullname'
    }, {
        $unwind: '$date'
    }, {
        $unwind: '$processId'
    }]

    return pipelineCash
}



module.exports = {
    func,
    funcDebt,
    managerAsset
}