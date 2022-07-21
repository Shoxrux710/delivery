
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
            from: "users",
            localField: "deliveryId.courierId",
            foreignField: "_id",
            as: "cour"
        }
    }, {
        $unwind: '$cour'
    },
    ...lookupUnwindOther, {
        $project: {
            courierId: '$deliveryId.courierId',
            managerId: '$cour.managerId',
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




module.exports = {
    func,
    funcDebt
}