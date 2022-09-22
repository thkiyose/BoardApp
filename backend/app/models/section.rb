class Section < ApplicationRecord
    enum :sections, { Civil: 0, Building: 1, Mechanical: 2, Piping: 3, Erectrical: 4 }
    enum :areas, { A: 0, B: 1, C: 2 }
end
