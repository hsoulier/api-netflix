# API Data Netflix



## Database

### Structure

| show_id       | type               | title               | director            | release_year  | description     |
| ------------- | ------------------ | ------------------- | ------------------- | ------------- | --------------- |
| Number int(8) | String varchar(50) | String varchar(255) | String varchar(210) | Number int(4) | String longtext |



### Data

All the data of the database are in this [file](./database.sql).



## Routes

*Parameters are passed in the body*

└─── /titles

​			└───  /:id **GET** *Fetch element selected by id*

​			└───  /:id **PUT** *Change element selected by id*

​			└───  /:id **DELETE** *Delete element selected by id*

​			─── **GET** *Fetch all data from db* 

​			─── **GET** *Fetch element selected by param in body* 

​			



