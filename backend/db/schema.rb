# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_28_015449) do
  create_table "news", charset: "utf8mb4", force: :cascade do |t|
    t.string "title", null: false
    t.text "content", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_news_on_user_id"
  end

  create_table "news_from_sections", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "news_id", null: false
    t.bigint "section_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["news_id"], name: "index_news_from_sections_on_news_id"
    t.index ["section_id"], name: "index_news_from_sections_on_section_id"
  end

  create_table "news_to_sections", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "news_id", null: false
    t.bigint "section_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["news_id"], name: "index_news_to_sections_on_news_id"
    t.index ["section_id"], name: "index_news_to_sections_on_section_id"
  end

  create_table "sections", charset: "utf8mb4", force: :cascade do |t|
    t.integer "sections", null: false
    t.integer "areas", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_sections", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "section_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["section_id"], name: "index_users_sections_on_section_id"
    t.index ["user_id"], name: "index_users_sections_on_user_id"
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name", null: false
    t.string "email", null: false
    t.text "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "news", "users"
  add_foreign_key "news_from_sections", "news"
  add_foreign_key "news_from_sections", "sections"
  add_foreign_key "news_to_sections", "news"
  add_foreign_key "news_to_sections", "sections"
  add_foreign_key "user_sections", "sections"
  add_foreign_key "user_sections", "users"
end
