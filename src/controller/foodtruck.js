import mongoose from 'mongoose';
import { Router } from 'express';
import Foodtruck from '../model/foodtruck';

export default({ config, db }) => {
    let api = Router();
    // CRUD
    
    // '/v1/foodtruck/add' - Create
    api.post('/add', (req, res) => {
        let newFood = new Foodtruck();
        newFood.name = req.body.name;

        newFood.save(err => {
            if (err) {
                res.setEncoding(err);
            }
            res.json({ message: 'The new foodtruck was successfully saved!' });
        });
    });
    // '/v1/foodtruck' - Read\Get
    api.get('/', (req, res) => {
        Foodtruck.find({}, (err, foodtrucks) => {
            if (err) {
                res.send(err);
            }
            res.json(foodtrucks);
        });
    });

    // '/v1/foodtruck/:id' -Read\Get by ID
    api.get('/:id', (req, res) => {
        Foodtruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    // '/v1/foodtruck/:id' - Update\Put
    api.put('/:id', (req, res) => {
        Foodtruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            foodtruck.name = req.body.name;
            foodtruck.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "The foodtruck info has been successfully updated!" });
            });
        });
    });

    // 'v1/foodtruck/:id' - Delete
    api.delete('/:id', (req, res) => {
        Foodtruck.remove({
            _id:req.params.id
        }, (err, foodtruck) => {
          if (err) {
              res.send(err);
          }
          res.json({ message: "The foodtruck was successfully removed!"});
        });
    });

    return api;
}
