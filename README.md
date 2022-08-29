# Introduction:
This is server side application built on node.js & mongodb as database implemented rest api for following things.<br>
1. endpoint: /api/products/file, This api expecting file is added in form-data having field name "csv". It read data store in mongodb database.
2. endpoint: /api/products?supplier=<value>&limit=<value>&offset, This supplier is mandatory queryParams and limit and offset is optional.
this api will return list of products whose supplier is mentioned endpoint. limit and offset is for pagingnation where offset for skipping no. of item and limit is for maximum no. of item taken after skipping. if no limit is passed then default is 30 and offset is 0.

3. endpoint: /products/not-expired?limit=<value>&offset=<value>; request body has to be passed as { "suppliers": [] }, This will return products which are not expired and works as above api but here you can any number of suppliers name in arrary. pagingnation work same as above.

# How to run application?
1. Install nodejs and mongodb and typescript.
2. clone this project and checkout project directory.
3. edit port number in src/config/config.ts.
4. run 'npm start'
5. You can use postman to hit api now.



Note: few things are left as far as i remember like
1. deleting file after inserting data into db.
2. In pagingnation, if limit is exceeded than default then should fallback to default. eg. ?limit=50 and default value is 30 then limit will be 30 only. 
