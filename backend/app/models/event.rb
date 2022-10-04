class Event < ApplicationRecord
    validates :title, presence: true, length: { maximum: 30}
    validates :start, presence: true
    validates :end, presence: true
    validate :date_check
    belong_to :user

    def date_check
        if self.start >= self.end
            errors.add(
                "終了", "は開始より後の日時を指定して下さい。"
            )
        end
    end
end
