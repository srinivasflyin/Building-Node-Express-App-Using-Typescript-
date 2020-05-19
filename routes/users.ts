var express = require('express');
var router = express.Router();
import { UserService } from '../services/user';
const userServiceRef = new UserService();

/* GET users listing. */
router.get('/', async function(req: any, res: any) {
  try {
      const response = await userServiceRef.userData();
      res.json({statusCode: 200,metaData: response});
    }
    catch(e){
      res.json({
        statusCode: 500,
        msg: 'Server Error'
      });
    }
  });


  router.get('/:id', async function(req: any, res: any) {
    try {
        const paramId = req.params.id;
        const response = await userServiceRef.singleUser(paramId);
        if(response)
        return res.json({statusCode: 200,metaData: response});
        return res.json({statusCode: 404});
      }
      catch(e){
       return res.json({
          statusCode: 500,
          msg: 'Server Error'
        });
      }
    });



    router.post('/update', async function(req: any, res: any) {
      try {
          const response = await userServiceRef.updateUser(req.body);
          if(response)
          return res.json({statusCode: 200,metaData: response});
          res.json({statusCode: 404});
        }
        catch(e){
         return res.json({
            statusCode: 500,
            msg: 'Server Error'
          });
        }
      });


      router.get('/delete/:id', async function(req: any, res: any) {
        try {
            const paramId = req.params.id;
            const response = await userServiceRef.deleteUser(paramId);
            if(response)
            return res.json({statusCode: 200,metaData: response});
            return res.json({statusCode: 404});
          }
          catch(e){
           return res.json({
              statusCode: 500,
              msg: 'Server Error'
            });
          }
        });
        




        
        router.post('/create-user', async function(req: any, res: any) {
          try {
              const response = await userServiceRef.createUser(req.body);
              if(response)
              return res.json({statusCode: 200,metaData: response});
              return res.json({statusCode: 404});
            }
            catch(e){
             return res.json({
                statusCode: 500,
                msg: 'Server Error'
              });
            }
          });

          
export default router;
