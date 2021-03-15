namespace :fbi do
  desc "TODO"
  task :ingest_documents, [:path] => :environment do |task, args|
    path_name = args[:path]
    if path_name.last == '/'
      path_name.chomp!
    end

    dir_name = File.basename(path_name)

    file_names = Dir[path_name + "/*"]
    category = File.basename(dir_name)

    puts "for category: #{dir_name}"
    puts "beginning upload for the following documents: \n#{file_names.join("\n")}"
    file_names.each { |file_name| Document.ingest_document(file_name, category) }
    puts "\n\n"
    p "all done!"
  end
end
