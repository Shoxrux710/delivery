

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
            case 'AB':
                if (SUPER || ADMIN || MANAGER) next()
                else res.status(401).json({errorMessage})
                break 
            case 'AGENT':
                if (AGENT) next()
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