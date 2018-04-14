import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import Technology from '../model/technology';

export default () => {
  let api = Router();
  api.get('/', authenticate, (req, res) => {
    Technology.find({}, (err, result) => {
      if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
      res.json(result);
    });
  });
  
  api.get('/:id', authenticate, (req, res) => {
    Technology.find({"country_id":req.params.id}, (err, result) => {
      if (err) {
        return res.status(401).json({
                message: 'Not Authenticated',
                success: false,
                error: err
            });
      }
      res.json(result);
    });
  });
  
  api.post('/add', authenticate,  (req, res) =>{
    Technology.findOne({"name":req.body.name}, (err, name) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        else if (name){
            res.status(300).json({ 
                message: `Technology alredy exists`,
                success: false
              });
        }
        else{
        var technology = new Technology({
            name: req.body.name
        });
        technology.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Saved!',
                success: 1,
                obj: result
            });
        });
        }
    });
});
  
  api.patch('/:id', authenticate, (req, res) => {
    Technology.findById(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!result) {
            return res.status(500).json({
                error: 'No result Found!'
            });
        }
        result.name = req.body.name;
        result.save( (err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated!',
                obj: result
            });
        });
    });
});

api.delete('/:id', authenticate,  (req, res) => {
    Technology.findById(req.params.id, (err, technology) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!technology) {
            return res.status(500).json({
                title: 'No technology Found!'
            });
        }
        technology.remove( (err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted!',
                obj: result
            });
        });
    });
});

  return api;
}