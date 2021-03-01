Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root 'admin_documents#index'
  get 'foo/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :fbi_documents
  get 'admin/documents', to: 'admin_documents#index'
  get 'editor', to: 'editor#index'
  resources :turk_documents do 
    resources :fields
  end
end
