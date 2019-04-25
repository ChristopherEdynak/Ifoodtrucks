import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review';

export default({ config, db }) => {
    let api = Router();
    // CRUD
    
    // '/v1/foodtruck/add' - Create
    api.post('/add', (req, res) => {
        let newFoodTruck = new FoodTruck();
        newFoodTruck.name = req.body.name;
        newFoodTruck.foodType = req.body.foodType;
        newFoodTruck.avgCost = req.body.avgCost;
        newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;
        newFoodTruck.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'The new foodtruck was successfully saved!' });
        });
    });
    // '/v1/foodtruck' - Read\Get
    api.get('/', (req, res) => {
        FoodTruck.find({}, (err, foodtrucks) => {
            if (err) {
                res.send(err);
            }
            res.json(foodtrucks);
        });
    });

    // '/v1/foodtruck/:id' -Read\Get by ID
    api.get('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    // '/v1/foodtruck/:id' - Update\Put
    api.put('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
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
        FoodTruck.remove({
            _id:req.params.id
        }, (err, foodtruck) => {
          if (err) {
              res.send(err);
          }
          res.json({ message: "The foodtruck was successfully removed!"});
        });
    });

    // add a review for a foodtruck by id
    // '/v1/foodtruck/reviews/add/:id'
    api.post('/reviews/add/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            let newReview = new Review();
            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.foodtruck = foodtruck._id;
            newReview.save((err, review) => {
                if (err) {
                    res.send(err);
                }
                foodtruck.reviews.push(newReview);
                foodtruck.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: 'Your foodtruck review has successfully been added and saved!' });
                });
            });
        });
    });

    return api;
}
