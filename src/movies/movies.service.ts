import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies : Movie[] = [];
    private newId = 0;

    getAll(): Movie[] {
        return this.movies;
    }
    
    search(year: number): Movie[] {
        return this.movies.filter(movie => movie.year >= year);
    }
    
    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);

        if(!movie) throw new NotFoundException(`Movie with ID ${id} not found.`);
        return movie;
    }
    
    deleteOne(id: number): boolean {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
        return true;
    }
    
    create(movieData : CreateMovieDTO) {
        this.movies.push({
            id: this.newId++,
            ...movieData,
        });
    }
    
    update(id: number, updateData : UpdateMovieDTO) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
    }
}
