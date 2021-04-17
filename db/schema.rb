# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_17_200803) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "digital_documents", force: :cascade do |t|
    t.date "document_date", null: false
    t.bigint "document_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["document_id"], name: "index_digital_documents_on_document_id"
  end

  create_table "documents", force: :cascade do |t|
    t.string "name"
    t.integer "page_length"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "category"
    t.string "status", default: "Not Started"
    t.uuid "public_id", default: -> { "uuid_generate_v4()" }, null: false
  end

  create_table "fields", force: :cascade do |t|
    t.string "serial_number"
    t.text "text_body"
    t.string "label"
    t.boolean "is_redacted"
    t.bigint "digital_document_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "page_number"
    t.string "raw_html"
    t.string "field_type", null: false
    t.index ["digital_document_id"], name: "index_fields_on_digital_document_id"
  end

  create_table "redactions", force: :cascade do |t|
    t.string "client_id"
    t.string "code"
    t.string "size"
    t.bigint "field_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["field_id"], name: "index_redactions_on_field_id"
  end

  create_table "table_fields", force: :cascade do |t|
    t.integer "row_idx"
    t.integer "col_idx"
    t.text "value"
    t.boolean "is_redacted"
    t.bigint "field_id"
    t.index ["field_id"], name: "index_table_fields_on_field_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
