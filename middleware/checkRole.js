

module.exports = (role) => {

    return (req, res, next) => {
       
        const {position} = req.user

        const COUR = position === 'courier'
        const ADMIN = position === 'admin'
        const AGENT = position === 'agent'
         
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
            default:
                res.status(401).json(errorMessage);
        }
    }
}