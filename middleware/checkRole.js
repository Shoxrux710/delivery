

module.exports = (role) => {

    return (req, res, next) => {
       
        const {position} = req.user

        const COUR = position === 'courier'
        const ADMIN = position === 'admin'
        const AGENT = position === 'agent'
        const MANAGER = position === 'manager'
         
        console.log(position)
        const errorMessage = { errorMessage: 'Вам нет доступа на это' };

        switch(role){
            case 'AB':
                if (ADMIN || COUR) next()
                else res.status(401).json({errorMessage})
                break 
            case 'AGENT':
                if (AGENT) next()
                else res.status(401).json({errorMessage})
                break
            case 'AA':
                    if (ADMIN) next()
                    else res.status(401).json({errorMessage})
                    break 
            case 'ALL':
                    if (ADMIN || COUR || AGENT || MANAGER) next()
                    else res.status(401).json({errorMessage})
                    break          
            default:
                res.status(401).json(errorMessage);
        }
    }
}