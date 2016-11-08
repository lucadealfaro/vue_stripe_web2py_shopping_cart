# Define your tables below (or better in another model file) for example
#
# >>> db.define_table('mytable', Field('myfield', 'string'))
#
# Fields can be 'string','text','password','integer','double','boolean'
#       'date','time','datetime','blob','upload', 'reference TABLENAME'
# There is an implicit 'id integer autoincrement' field
# Consult manual for more options, validators, etc.


# Product table.
db.define_table('product',
    Field('product_name'),
    Field('quantity', 'integer'),
    Field('price', 'float'),
    Field('image', 'upload'),
    Field('description', 'text'),
)
db.product.id.readable = db.product.id.writable = False

# after defining tables, uncomment below to enable auditing
# auth.enable_record_versioning(db)
