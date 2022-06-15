

module.exports = (role) => {

    return (req, res, next) => {
       
        const {position} = req.user

        const COUR = position === 'courier'
        const ADMIN = position === 'admin'
        const AGENT = position === 'agent'
        const MANAGER = position === 'manager'
        const SUPER = position === 'super-admin'
         
        console.log(position)
        const errorMessage = { errorMessage: 'Вам нет доступа на это' };

        switch(role){
            case 'AA':
                if (SUPER || ADMIN) next()
                else res.status(401).json({errorMessage})
                break 
            case 'BB':
                if (MANAGER) next()
                else res.status(401).json({errorMessage})
                break 
            case 'BC':
                if (MANAGER || COUR) next()
                else res.status(401).json({errorMessage})
                break 
            case 'AGENT':
                if (AGENT) next()
                else res.status(401).json({errorMessage})
                break
            case 'COUR':
                if (COUR) next()
                else res.status(401).json({errorMessage})
                break
            case 'SA':
                if (ADMIN || SUPER) next()
                else res.status(401).json({errorMessage})
                break 
            case 'ALL':
                if (ADMIN || COUR || AGENT || MANAGER || SUPER) next()
                else res.status(401).json({errorMessage})
                break          
            default:
                res.status(401).json(errorMessage);
        }
    }
}