def get_next_date(date, month, year):

    date, month, year = int(date), int(month), int(year)

    if month in [1, 3, 5, 7, 8, 10, 12]:
        max_days = 31
    elif month in [4, 6, 9, 11]:
        max_days = 30
    else:
        if (year % 4) == 0:
            if (year % 100) == 0:
                if (year % 400) == 0:
                    max_days = 29
                else:
                    max_days = 28
            else:
                max_days = 29
        else:
            max_days = 28

    if date == max_days:
        date = 1
        if month == 12:
            month = 1
            year += 1
        else:
            month += 1
    else:
        date += 1

    return str(date).zfill(2), str(month).zfill(2), str(year)

def get_next_month (month, year):

    month, year = int(month), int(year)

    if month == 12:
        month = 1
        year += 1
    else:
        month += 1

    return str(month).zfill(2), str(year)

def get_days(month, year):

    month, year = int(month), int(year)

    if month in [1, 3, 5, 7, 8, 10, 12]:
        return 31
    elif month in [4, 6, 9, 11]:
        return 30
    else:
        if (year % 4) == 0:
            if (year % 100) == 0:
                if (year % 400) == 0:
                    return 29
                else:
                    return 28
            else:
                return 29
        else:
            return 28